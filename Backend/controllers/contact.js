import emailjs from "@emailjs/nodejs";

export const summitFrom = async (req, res) => {
  const SERVICE_ID = "service_evlnuw8";
  const TEMPLATE_ID = "template_oas3n7p";
  const PUBLIC_KEY = "AsO8sIjTsVj3LsoB2";
  const PRIVATE_KEY = "UHJoWVCwSHIC3La_lULNA";

  const { name, email, subject, message, time } = req.body;

  await emailjs
    .send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        name,
        email,
        subject,
        message,
        time,
      },
      {
        publicKey: PUBLIC_KEY,
        privateKey: PRIVATE_KEY,
      }
    )
    .then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.error(error.text);
      }
    );

  res.status(200).json({ message: "Form submitted successfully" });
};
