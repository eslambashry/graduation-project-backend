import Stripe from "stripe";

export const paymentFunction = async(
    payment_method_types=['card'], //required // ! payment methods type -> (amazon_payment - paypal - )
    mode='payment', //required
    customer_email = '',//optinal
    metadata = {}, //optinal
    success_url, //required
    cancel_url, //optinal
    discounts = [], //optinal
    line_items=[] //required

) => {
    const stripe = new Stripe('sk_test_51Q0Stx1BDc3FGejoe8y5l8EKXCy9zylTH6kWjLmWqVUKUsgvbgLi1ZCbotQefcrRxkRlMoAVMfDyGVtAHSUounpY00DVLBjyO3')

    const paymentData = await stripe.checkout.sessions.create({
        payment_method_types:['card'], //required // ! payment methods type -> (amazon_payment - paypal - )
        mode:'payment', //required
        customer_email,//optinal
        metadata, //optinal
        success_url, //required
        cancel_url, //optinal
        discounts, //optinal
        line_items //required
    })
    return paymentData;
}



// {
//     price_data:{
//         currency,
//         doctor_data:{
//             name
//         },
//         unite_ammount,
//     },
//  ~   quantity,  // optinal
// }