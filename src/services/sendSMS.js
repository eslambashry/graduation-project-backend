import { Vonage } from '@vonage/server-sdk'


 
const vonage = new Vonage({
  apiKey: '7bfaf215',
  apiSecret: "xRpb2zcPhSG7WFNa"
});


const from = "Saifee Hospital"
export async function sendSMS(to,text) {
    await vonage.sms.send({to, from, text})
        .then(resp => { console.log('Message sent successfully'); console.log(resp); })
        .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
}

