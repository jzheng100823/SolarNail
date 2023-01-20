
const functions = require("firebase-functions");
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sethtrash.haugland@gmail.com",
        pass: ""
    }
})

exports.ScheduleBooking = functions.firestore.document('BookingInfo/{bookId}')
    .onCreate((snap, context) => {
        var data = snap.data()

        var date = data.startTime.toDate().toLocaleDateString('en-US', {timezone: 'America/New_York'});
        var time = data.startTime.toDate().toLocaleTimeString('en-US', {timezone: 'America/New_York'});

        var mailOptions = {
            from: 'solarnails@gmail.com',
            to: data.email,
            subject: 'Appointment At Solar Nails',
            text: "Your appointment with: " + data.technician + " at " + date + ' ' + time + " \nis confirmed"
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error)
                console.log("error: ", error);
            else
                console.log("Email should be sent");
        });
    });

exports.ServiceWalkin = functions.firestore.document('WalkIn/{walkInId}')
    .onUpdate((change, context) => {
        if (change.before && change.before.data()) {
            const oldEmail = change.before.data().email;
            const serviced = change.after.data().serviced;

            if (serviced === true) {
                var mailOptions = {
                    from: 'solarnails@gmail.com',
                    to: oldEmail,
                    subject: 'Booking with Solar Nails',
                    text: "Someone is now ready to see you. Please make your way to the front desk as soon as possible."
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error)
                        console.log("error: ", error);
                    else
                        console.log("Email should be sent");
                });
            }
        }
    });
