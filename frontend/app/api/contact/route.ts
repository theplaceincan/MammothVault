import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { fullName, email, phoneNumber, message } = await req.json();

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: 'fullName, email, and message are required' },
        { status: 400 }
      );
    }

    const html = `
      <h2>New contact message</h2>
      <p><b>Name:</b> ${fullName}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phoneNumber || '-'}</p>
      <p><b>Message:</b></p>
      <pre style="white-space:pre-wrap">${message}</pre>
    `;

    await resend.emails.send({
    //   from: 'no-reply@tcmedicore.com',
      from: 'MammothVault <onboarding@resend.dev>',
      to: process.env.CONTACT_TO!, // support@tcmedicore.com
      subject: `Contact form: ${fullName}`,
      replyTo: email,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error('Contact form failed:', e);
    return NextResponse.json(
      { error: e?.message || 'Email failed' },
      { status: 500 }
    );
  }
}
