"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY);
var _Request = require('../models/Request'); var _Request2 = _interopRequireDefault(_Request);


const verifyPayments = async () => {
    try {
        const sessionsCheckout = await stripe.checkout.sessions.list({
            limit: 3,
        });

        sessionsCheckout.data.forEach(async (session) => {
            const request = await _Request2.default.findOne({
                where: {
                    payment_id: session.id
                }
            })
            if (session.payment_status !== 'paid') {
                return
            }

            if (!request || request.payment_status !== 'unpaid') {
                return
            }

            await request.update({
                payment_status: session.payment_status
            })

        })
        console.log('Verificando pagamento em: ' + new Date())

    } catch (e) {
        return res
            .status(400)
            .json({ errors: e.errors.map((err) => err.message) });
    }
}

exports. default = verifyPayments