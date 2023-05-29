const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY);
import { Op } from 'sequelize';

import Request from '../models/Request'
import Product from '../models/Product';

const PAYMENT_CONFIRMATION_URL = `${process.env.FRONT_END_URL}/payment-confirmation`;

class PaymentController {
  async store(req, res) {
    const nro_request = +req.params.nro_request
    const user_id = +req.user_id

    if (!user_id) {
      return res.status(401).json({
        errors: ['Login required']
      })
    }

    const request = await Request.findOne({
      where: {
        [Op.and]: [
          { id: nro_request },
          { user_id }
        ]
      },
      include: {
        attributes: ['price', 'name'],
        model: Product,
        as: 'products',
        through: {
          attributes: ['quantity']
        },
      }
    })

    if (!request) {
      return res.status(400).json({
        errors: ['Request not found']
      })
    }

    if (request.payment_status == 'paid') {
      return res.status(400).json({
        error: ['This request is payd']
      })
    }


    const items = request.products.map((product) => ({
      price_data: {
        currency: "brl",
        product_data: {
          name: product.name,
        },
        unit_amount: parseInt(`${product.price}` * 100),
      },
      quantity: product.request_products.dataValues.quantity
    }));


    const session = await stripe.checkout.sessions.create({
      line_items: items,
      mode: "payment",
      success_url: `${PAYMENT_CONFIRMATION_URL}?success=true`,
      cancel_url: `${PAYMENT_CONFIRMATION_URL}?canceled=true`,
    });

    await request.update({
      payment_id: session.id
    })

    res.send({ url: session.url });
  }

  async show(req, res) {
    const sessions = await stripe.checkout.sessions.list({
      limit: 3,
    });
    res.send(sessions);
  }
}
export default new PaymentController();
