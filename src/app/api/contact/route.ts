// src/app/api/contact/route.ts

import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

export async function POST(req: Request) {
    try {
      
        
    const body = await req.json();
console.log("CONTACT FORM DATA:", body);
    const { name, email, message, phone } = body;

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // true for 465, false for 587
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Send mail
    await transporter.sendMail({
      from: `"${process.env.ALIAS_NAME}" <${process.env.SMTP_MAIL}>`,
      replyTo: email,
      to: process.env.RECEIVER_EMAIL,

      subject: `New Contact Form Submission - ${name}`,

      html: `
        <div style="font-family:Arial;padding:20px;">
          <h2>New Contact Form Submission</h2>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>

          <div style="margin-top:20px;">
            <strong>Message:</strong>
            <p>${message}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });

  } catch (error) {
    console.error("EMAIL ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email",
      },
      { status: 500 }
    );
  }
}