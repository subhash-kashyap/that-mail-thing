import { Resend } from "resend";

// initiate the resend instance
const resend = new Resend(process.env.RESEND_API_KEY);

const timer = (time) => {
  return new Promise((res) => {
    setTimeout(() => res(true), time);
  });
};

export default async function handler(req, res) {
  const { subject, email, tasks } = req.body;
  if (!subject || !tasks || !email) {
    res.status(400).json({ invalid: true });
  }
  console.log("tasks:", tasks);
  for (const task of tasks) {
    console.log("\n\ntask in for:", task);

    await resend.emails.send({
      from: "Bruce Wayne <onboarding@resend.dev>",
      to: [email],
      subject,
      text: "10 min mark",
    });

    // Wait 10 minutes
    console.log("triggering timer");
    await timer(600);
  }
  console.log("mails should've been triggered");
  res.status(200).json({ invalid: false });
}
