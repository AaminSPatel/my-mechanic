import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      billNumber,
      customerName,
      mobileNumber,
      customerAddress,
      brand,
      carModel,
      vehicleNumber,
      odometer,
      serviceName,
      charge,
      discount,
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
    const from = process.env.EMAIL_FROM || `"MyMechanic24 Billing" <${user}>`;
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

    const displayBillNo = billNumber || `MM24-BILL-${(date || "").replace(/-/g, "")}`;
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
          .header { background: #0f172a; color: #ffffff; padding: 24px; text-align: center; }
          .header h1 { margin: 0; font-size: 20px; letter-spacing: 0.5px; }
          .header p { margin: 6px 0 0 0; font-size: 12px; opacity: 0.85; }
          .bill-tag { display: inline-block; background: #dc2626; color: #ffffff; padding: 4px 14px; border-radius: 9999px; font-size: 11px; font-weight: 800; margin-top: 10px; letter-spacing: 0.5px; }
          .content { padding: 24px; }
          .section-title { font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b; margin-bottom: 8px; border-bottom: 1px solid #f1f5f9; padding-bottom: 4px; }
          .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .table td { padding: 10px 12px; border-bottom: 1px solid #f3f4f6; font-size: 13px; }
          .table td.label { font-weight: 600; color: #4b5563; width: 38%; background: #f9fafb; }
          .table td.value { color: #111827; font-weight: 500; }
          .amount-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-top: 16px; }
          .amount-row { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px; }
          .amount-row.total { font-size: 16px; font-weight: 800; color: #dc2626; border-top: 1px solid #cbd5e1; padding-top: 8px; margin-top: 8px; }
          .amount-row.balance { font-size: 13px; font-weight: 700; color: #e11d48; background: #fff1f2; padding: 6px 8px; border-radius: 6px; }
          .footer { background: #f8fafc; padding: 16px 24px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🧾 MyMechanic24 - Customer Service Bill</h1>
            <p>Workshop: Nayta Mundla Main Road, Indore (Near Palda &amp; Tejaji Nagar)</p>
            <div class="bill-tag">${displayBillNo} · ${formattedDate}</div>
          </div>

          <div class="content">
            <div class="section-title">Customer &amp; Vehicle Info</div>
            <table class="table">
              <tr>
                <td class="label">Customer Name</td>
                <td class="value"><strong>${customerName || "Walk-in Customer"}</strong></td>
              </tr>
              <tr>
                <td class="label">Mobile Number</td>
                <td class="value"><a href="tel:${mobileNumber}" style="color: #dc2626; text-decoration: none; font-weight: bold;">${mobileNumber || "N/A"}</a></td>
              </tr>
              ${
                customerAddress
                  ? `<tr><td class="label">Address / Area</td><td class="value">${customerAddress}</td></tr>`
                  : ""
              }
              <tr>
                <td class="label">Vehicle</td>
                <td class="value"><strong>${vehicleDesc}</strong></td>
              </tr>
              <tr>
                <td class="label">Vehicle Number</td>
                <td class="value" style="font-family: monospace; font-weight: bold;">${vehicleNumber || "N/A"}</td>
              </tr>
              <tr>
                <td class="label">Odometer</td>
                <td class="value">${odometer ? `${odometer} KM` : "N/A"}</td>
              </tr>
            </table>

            <div class="section-title">Service &amp; Spares Particulars</div>
            <table class="table">
              <tr>
                <td class="label">Jobs Performed</td>
                <td class="value"><strong>${serviceName || "Car Repair & Maintenance"}</strong></td>
              </tr>
              <tr>
                <td class="label">Payment Mode</td>
                <td class="value"><span style="color: #059669; font-weight: bold;">${paymentMethod || "Cash"}</span></td>
              </tr>
            </table>

            <div class="amount-box">
              <div class="amount-row">
                <span>Gross Subtotal:</span>
                <span>₹${charge || "0"}</span>
              </div>
              ${
                discount && Number(discount) > 0
                  ? `<div class="amount-row" style="color: #059669;"><span>Discount:</span><span>-₹${discount}</span></div>`
                  : ""
              }
              <div class="amount-row total">
                <span>Net Total Received:</span>
                <span>₹${totalPayment || charge || "0"}</span>
              </div>
              ${
                balancePayment && Number(balancePayment) > 0
                  ? `
                <div class="amount-row balance">
                  <span>Balance Due:</span>
                  <span>₹${balancePayment}</span>
                </div>
              `
                  : `<div class="amount-row" style="color: #059669; font-size: 12px; font-weight: bold; margin-top: 6px;"><span>Status:</span><span>PAID IN FULL · NIL DUE</span></div>`
              }
            </div>

            <p style="font-size: 11px; color: #64748b; margin-top: 16px; text-align: center;">
              📎 The official printable service bill receipt is attached to this email.
            </p>
          </div>

          <div class="footer">
            Service Bill generated via MyMechanic24 Portal.<br/>
            Workshop: Nayta Mundla Main Road, Near Palda &amp; Tejaji Nagar, Indore 452020.
          </div>
        </div>
      </body>
      </html>
    `;

    const attachments = [];
    if (invoiceImage && typeof invoiceImage === "string" && invoiceImage.startsWith("data:image/png;base64,")) {
      const base64Data = invoiceImage.replace(/^data:image\/png;base64,/, "");
      attachments.push({
        filename: `${(customerName || "customer").replace(/\s+/g, "_")}-bill-${formattedDate}.png`,
        content: Buffer.from(base64Data, "base64"),
        contentType: "image/png",
      });
    }

    const mailOptions = {
      from,
      to,
      subject: `🧾 Service Bill [${displayBillNo}]: ${customerName || "Customer"} (${vehicleDesc} - ₹${totalPayment || charge || "0"})`,
      text: `
MyMechanic24 Service Bill Copy:
Bill Number: ${displayBillNo}
Date: ${formattedDate}
Customer: ${customerName || "N/A"}
Mobile: ${mobileNumber || "N/A"}
Address: ${customerAddress || "N/A"}
Vehicle: ${vehicleDesc} (${vehicleNumber || "N/A"})
Odometer: ${odometer || "N/A"} KM
Services / Spares: ${serviceName || "N/A"}
Subtotal: ₹${charge || "0"}
Discount: ₹${discount || "0"}
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
      message: "Bill email successfully sent to admin.",
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
