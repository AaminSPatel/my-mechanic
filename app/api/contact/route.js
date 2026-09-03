import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      email,
      vehicle,
      service,
      address,
      message,
      problem,
      source = "Website Contact Form",
    } = body;

    if (!name && !phone) {
      return NextResponse.json(
        { error: "Name and Phone number are required." },
        { status: 400 }
      );
    }

    const host = process.env.EMAIL_HOST || "smtp.gmail.com";
    const port = parseInt(process.env.EMAIL_PORT || "587", 10);
    const user = process.env.EMAIL_USERNAME;
    const pass = process.env.EMAIL_PASSWORD;
    const from = process.env.EMAIL_FROM || `"MyMechanic24" <${user}>`;
    const to = process.env.ADMIN_EMAIL || "locomail112@gmail.com";

    if (!user || !pass) {
      console.error("Nodemailer configuration error: EMAIL_USERNAME or EMAIL_PASSWORD missing.");
      return NextResponse.json(
        { error: "Email server credentials are not configured." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    const now = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const detailProblem = message || problem || "Not specified";
    const userLocation = address || "Not specified (Indore)";
    const cleanPhone = (phone || "").replace(/[^0-9]/g, "");

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f5f7; margin: 0; padding: 24px; color: #1f2937; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.08); border: 1px solid #e5e7eb; }
          .header { background: #DC2626; color: #ffffff; padding: 24px; text-align: center; }
          .header h1 { margin: 0; font-size: 22px; letter-spacing: 0.5px; }
          .header p { margin: 6px 0 0 0; font-size: 13px; opacity: 0.9; }
          .badge { display: inline-block; background: #fef2f2; color: #DC2626; border: 1px solid #fecaca; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-top: 8px; }
          .content { padding: 24px; }
          .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .table td { padding: 12px 14px; border-bottom: 1px solid #f3f4f6; font-size: 14px; }
          .table td.label { font-weight: 600; color: #4b5563; width: 35%; background: #f9fafb; }
          .table td.value { color: #111827; font-weight: 500; }
          .actions { display: flex; gap: 12px; margin-top: 24px; text-align: center; }
          .btn { display: inline-block; padding: 12px 20px; font-size: 13px; font-weight: bold; border-radius: 8px; text-decoration: none; text-transform: uppercase; letter-spacing: 0.5px; }
          .btn-call { background: #DC2626; color: #ffffff !important; }
          .btn-whatsapp { background: #10B981; color: #ffffff !important; margin-left: 8px; }
          .footer { background: #f9fafb; padding: 16px 24px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #f3f4f6; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Customer Inquiry</h1>
            <p>MyMechanic24 · Nayta Mundla Main Road, Indore</p>
            <div class="badge">${source}</div>
          </div>
          
          <div class="content">
            <table class="table">
              <tr>
                <td class="label">Customer Name</td>
                <td class="value"><strong>${name || "Not provided"}</strong></td>
              </tr>
              <tr>
                <td class="label">Mobile Number</td>
                <td class="value"><a href="tel:${phone}" style="color: #DC2626; text-decoration: none; font-weight: bold;">${phone || "Not provided"}</a></td>
              </tr>
              ${
                email
                  ? `<tr>
                      <td class="label">Email Address</td>
                      <td class="value"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
                    </tr>`
                  : ""
              }
              <tr>
                <td class="label">Car Brand & Model</td>
                <td class="value">${vehicle || "Not provided"}</td>
              </tr>
              <tr>
                <td class="label">Service Requested</td>
                <td class="value"><span style="color: #DC2626; font-weight: bold;">${service || "General Inquiry"}</span></td>
              </tr>
              <tr>
                <td class="label">Customer Location</td>
                <td class="value">${userLocation}</td>
              </tr>
              <tr>
                <td class="label">Problem / Message</td>
                <td class="value">${detailProblem}</td>
              </tr>
              <tr>
                <td class="label">Received At</td>
                <td class="value">${now}</td>
              </tr>
            </table>

            <div class="actions">
              ${
                cleanPhone
                  ? `
                  <a href="tel:${cleanPhone}" class="btn btn-call">📞 Call Customer</a>
                  <a href="https://wa.me/91${cleanPhone}?text=Hi%20${encodeURIComponent(
                      name || ""
                    )},%20this%20is%20MyMechanic24%20regarding%20your%20car%20inquiry." class="btn btn-whatsapp">💬 Reply on WhatsApp</a>
                `
                  : ""
              }
            </div>
          </div>

          <div class="footer">
            This lead was automatically generated from MyMechanic24 website.<br/>
            Workshop: Nayta Mundla Main Road, Indore (Near Palda & Tejaji Nagar).
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from,
      to,
      subject: `🚨 New Lead [${service || "Service"}]: ${name || "Customer"} (${vehicle || "Car"}) - Indore`,
      text: `
New Inquiry Received from MyMechanic24:
Source: ${source}
Name: ${name}
Phone: ${phone}
Email: ${email || "N/A"}
Vehicle: ${vehicle || "N/A"}
Service: ${service || "N/A"}
Location: ${userLocation}
Details/Problem: ${detailProblem}
Time: ${now}
      `.trim(),
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
      message: "Inquiry successfully delivered to email.",
    });
  } catch (error) {
    console.error("Error sending email via Nodemailer:", error);
    return NextResponse.json(
      {
        error: "Failed to send email notification.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

