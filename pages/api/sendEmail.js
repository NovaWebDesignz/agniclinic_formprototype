import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone } = req.body;

  // Create a Nodemailer transporter with Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail email
      pass: process.env.EMAIL_PASS, // Your Gmail app password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email, // Send email to the user
    subject: "Appointment Confirmation",
    text: `Hello ${name},\n\nYour appointment has been successfully booked.\n\nDetails:\n- Name: ${name}\n- Phone: ${phone}\n\nThank you!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ success: false, error: "Email sending failed." });
  }
}
