import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      customerName,
      mobileNumber,
      brand,
      carModel,
      vehicleNumber,
      odometer,
      serviceName,
      charge,
      totalPayment,
      balancePayment,
      paymentMethod,
      date,
      invoiceImage,
    } = body;

    const host = process.env.EMAIL_HOST || "smtp.gmail.com";
    const port = parseInt(process.env.EMAIL_PORT || "587", 10);
    const user = process.env.EMAIL_USERNAME;
    const pass = process.env.EMAIL_PASSWORD;
    const from = process.env.EMAIL_FROM || `"MyMechanic24 Invoicing" <${user}>`;
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

    const invNumber = `#INV-${(date || "").replace(/-/g, "")}`;
    const vehicleDesc = [brand, carModel].filter(Boolean).join(" ") || "Vehicle";
    const formattedDate = date || new Date().toISOString().split("T")[0];

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f5f7; margin: 0; padding: 24px; color: #1f2937; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.08); border: 1px solid #e5e7eb; }
          .header { background: #1e293b; color: #ffffff; padding: 24px; text-align: center; }
          .header h1 { margin: 0; font-size: 22px; letter-spacing: 0.5px; }
          .header p { margin: 6px 0 0 0; font-size: 13px; opacity: 0.85; }
          .inv-tag { display: inline-block; background: #2563eb; color: #ffffff; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 700; margin-top: 10px; }
          .content { padding: 24px; }
          .section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; color: #64748b; margin-bottom: 8px; border-bottom: 1px solid #f1f5f9; padding-bottom: 4px; }
          .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .table td { padding: 10px 12px; border-bottom: 1px solid #f3f4f6; font-size: 13px; }
          .table td.label { font-weight: 600; color: #4b5563; width: 38%; background: #f9fafb; }
          .table td.value { color: #111827; font-weight: 500; }
          .amount-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-top: 16px; }
          .amount-row { display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 6px; }
          .amount-row.total { font-size: 17px; font-weight: 800; color: #2563eb; border-top: 1px solid #cbd5e1; padding-top: 8px; margin-top: 8px; }
          .amount-row.balance { font-size: 14px; font-weight: 700; color: #e11d48; background: #fff1f2; padding: 6px 8px; border-radius: 6px; }
          .footer { background: #f8fafc; padding: 16px 24px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🧾 MyMechanic24 - Invoice Copy</h1>
            <p>Workshop: Nayta Mundla Main Road, Indore</p>
            <div class="inv-tag">${invNumber} · ${formattedDate}</div>
          </div>

          <div class="content">
            <div class="section-title">Customer & Vehicle Info</div>
            <table class="table">
              <tr>
                <td class="label">Customer Name</td>
                <td class="value"><strong>${customerName || "Walk-in Customer"}</strong></td>
              </tr>
              <tr>
                <td class="label">Mobile Number</td>
                <td class="value"><a href="tel:${mobileNumber}" style="color: #2563eb; text-decoration: none; font-weight: bold;">${mobileNumber || "N/A"}</a></td>
              </tr>
              <tr>
                <td class="label">Vehicle</td>
                <td class="value"><strong>${vehicleDesc}</strong></td>
              </tr>
              <tr>
                <td class="label">Vehicle Number</td>
                <td class="value">${vehicleNumber || "N/A"}</td>
              </tr>
              <tr>
                <td class="label">Odometer</td>
                <td class="value">${odometer ? `${odometer} KM` : "N/A"}</td>
              </tr>
            </table>

            <div class="section-title">Service Details</div>
            <table class="table">
              <tr>
                <td class="label">Service Description</td>
                <td class="value"><strong>${serviceName || "Car Repair & Maintenance"}</strong></td>
              </tr>
              <tr>
                <td class="label">Payment Method</td>
                <td class="value"><span style="color: #10b981; font-weight: bold;">${paymentMethod || "Cash"}</span></td>
              </tr>
            </table>

            <div class="amount-box">
              <div class="amount-row">
                <span>Net Charge:</span>
                <span>₹${charge || "0"}</span>
              </div>
              <div class="amount-row total">
                <span>Total Received:</span>
                <span>₹${totalPayment || "0"}</span>
              </div>
              ${
                balancePayment && Number(balancePayment) > 0
                  ? `
                <div class="amount-row balance">
                  <span>Balance Due:</span>
                  <span>₹${balancePayment}</span>
                </div>
              `
                  : ""
              }
            </div>

            <p style="font-size: 12px; color: #64748b; margin-top: 16px; text-align: center;">
              📎 The generated receipt image has also been attached to this email.
            </p>
          </div>

          <div class="footer">
            Invoice generated from MyMechanic24 Admin Portal.<br/>
            Central Workshop: Nayta Mundla Main Road, Indore (Near Palda & Tejaji Nagar).
          </div>
        </div>
      </body>
      </html>
    `;

    const attachments = [];
    if (invoiceImage && typeof invoiceImage === "string" && invoiceImage.startsWith("data:image/png;base64,")) {
      const base64Data = invoiceImage.replace(/^data:image\/png;base64,/, "");
      attachments.push({
        filename: `${customerName || "customer"}-invoice-${formattedDate}.png`,
        content: Buffer.from(base64Data, "base64"),
        contentType: "image/png",
      });
    }

    const mailOptions = {
      from,
      to,
      subject: `🧾 Invoice Created [${invNumber}]: ${customerName || "Customer"} (${vehicleDesc} - ₹${totalPayment || charge || "0"})`,
      text: `
MyMechanic24 Invoice Copy:
Invoice Number: ${invNumber}
Date: ${formattedDate}
Customer: ${customerName || "N/A"}
Mobile: ${mobileNumber || "N/A"}
Vehicle: ${vehicleDesc} (${vehicleNumber || "N/A"})
Odometer: ${odometer || "N/A"} KM
Service: ${serviceName || "N/A"}
Net Charge: ₹${charge || "0"}
Total Paid: ₹${totalPayment || "0"}
Balance Due: ₹${balancePayment || "0"}
Payment Method: ${paymentMethod || "Cash"}
      `.trim(),
      html: htmlContent,
      attachments,
    };

    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
      message: "Invoice email successfully sent to admin.",
    });
  } catch (error) {
    console.error("Error sending invoice email via Nodemailer:", error);
    return NextResponse.json(
      {
        error: "Failed to send invoice email.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

