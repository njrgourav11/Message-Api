require("dotenv").config();
const twilio = require("twilio");

// Initialize Twilio client with your Account SID and Auth Token
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Function to send SMS
const sendSMS = async (body, from, to) => {
  try {
    const message = await client.messages.create({
      body: body,
      from: from,
      to: to
    });
    console.log("Message sent successfully. SID:", message.sid);
    return message;
  } catch (error) {
    console.error("Error sending SMS:", error.message);
    throw error;
  }
};

// Example usage
const main = async () => {
  try {
    const from = process.env.TWILIO_FROM_NUMBER;
    const to = process.env.TWILIO_TO_NUMBER;
    const body = "Dear Parents your child is absent in the english class from 2-3pm";
    await sendSMS(body, from, to);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

// Call the main function
main();
