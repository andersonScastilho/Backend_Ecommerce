const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY);
import Request from '../models/Request'


const verifyPayments = async () => {
    try {
        const sessionsCheckout = await stripe.checkout.sessions.list({
            limit: 25,
        });

        sessionsCheckout.data.forEach(async (session) => {
            const request = await Request.findOne({
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

export default verifyPayments