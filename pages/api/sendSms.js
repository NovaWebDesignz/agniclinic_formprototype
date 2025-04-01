import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  try {
    const { phone, name, date } = req.body; // Extract form data

    const message = await client.messages.create({
      from: twilioNumber,
      to: `+91${phone}`, // Ensure phone is formatted correctly
      body: `Hello ${name}, your appointment is confirmed for ${date}.`,
    });

    res.status(200).json({ success: true, sid: message.sid });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
