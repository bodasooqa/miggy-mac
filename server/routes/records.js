const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();

const Record = require('../models/Record');

router.get('/', async (req, res) => {
    res.json(await Record.find());
});

router.post('/', async (req, res) => {
    const output = `
        <p>You have a new message from Bodasooqa.</p>
        <ul>
            <li>username: ${req.body.username}</li>
            <li>email: ${req.body.email}</li>
        </ul>
    `;
    const record = new Record(req.body);
    await record.save();
    res.json({state: 'success'});

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'bodasooqa@gmail.com',
            pass: '4062036Tt'
        }
    });

    let mailOptions = {
        from: '"Bodasooqa 👻" <test@gmail.com>',
        to: 'timlol9894@gmail.com',
        subject: 'Bodasooqa | New message',
        text: req.body.username,
        html: output
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
});

router.get('/:id', async (req, res) => {
    res.json(await Record.findById(req.params.id));
});

router.put('/:id', async (req, res) => {
    await Record.findByIdAndUpdate(req.params.id, req.body);
    res.json({state: 'updated'});
});

router.delete('/:id', async (req, res) => {
    await Record.findByIdAndRemove(req.params.id);
    res.json({state: 'deleted'});
});

module.exports = router;