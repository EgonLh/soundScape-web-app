"use server"; // ✅ This forces it to run on the server

import nodemailer from "nodemailer";

export const sendEmail = async (value) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: value?.user_email,
        subject: value?.topic,
        text: value?.message,
    });

    console.log("Success !")

    return "Email sent!";
};
