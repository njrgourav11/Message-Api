// const express = require('express');
// const bodyParser = require('body-parser');
// const twilio = require('twilio');
// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 3000;

// // Middleware
// app.use(bodyParser.json());

// // Twilio initialization
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = twilio(accountSid, authToken);

// // Endpoint to handle absent button click and send SMS
// app.post('/absent', async (req, res) => {
//   try {
//     const { phoneNumber } = req.body;
//     const message = 'You have been marked as absent.';
    
//     // Send SMS
//     await client.messages.create({
//       body: message,
//       from: process.env.TWILIO_FROM_NUMBER,
//       to: phoneNumber // Use the provided phone number
//     });

//     res.status(200).send('SMS sent successfully.');
//   } catch (error) {
//     console.error('Error sending SMS:', error);
//     res.status(500).send('Error sending SMS.');
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
