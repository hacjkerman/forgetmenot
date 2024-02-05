// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
import twilio from "twilio";
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
export function sms(number) {
  const client = twilio(accountSid, authToken);

  client.messages
    .create({
      body: "This is the ship that made the Kessel Run in fourteen parsecs?",
      from: "+12675206118",
      to: number,
    })
    .then((message) => console.log(message.sid));
}
