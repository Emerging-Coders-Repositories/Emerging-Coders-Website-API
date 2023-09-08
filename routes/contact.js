const express = require("express");
const router = express.Router();
const { BadRequestError } = require("../utils/errors");
const axios = require("axios");
const URLSearchParams = require("url").URLSearchParams;
require("dotenv").config();

router.post("/", async (req, res, next) => {
    try {
        const { email, subject, message } = await req.body; 

        if (!email || !subject || !message) {
            return next(new BadRequestError("Email, subject, and message are required"));
        }; 

        const GOOGLE_FORM_EMAIL_ID = process.env.GOOGLE_FORM_EMAIL_FIELD;
        const GOOGLE_FORM_SUBJECT_ID = process.env.GOOGLE_FORM_SUBJECT_FIELD;
        const GOOGLE_FORM_MESSAGE_ID = process.env.GOOGLE_FORM_MESSAGE_FIELD;

        const appendedFormData = {
            [GOOGLE_FORM_EMAIL_ID]: email,
            [GOOGLE_FORM_SUBJECT_ID]: subject,
            [GOOGLE_FORM_MESSAGE_ID]: message
        };

        const params = new URLSearchParams(appendedFormData);

        axios({
            method: "post",
            url: process.env.GOOGLE_FORM_API_LINK, 
            data: params,
        })
        .then((response) => {
            return res.status(200).json({ success: true });
        })
        .catch((error) => {
            return res.status(400).json({ success: false });
        });
    } catch (error) {
        next(error);
    }
})

module.exports = router;