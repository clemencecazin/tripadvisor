const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(formidable());
app.use(cors());

// Mailgun
var API_KEY = process.env.MAILGUN_API_KEY;
var DOMAIN = process.env.MAILGUN_DOMAIN;
var mailgun = require("mailgun-js")({ apiKey: API_KEY, domain: DOMAIN });

app.post("/form", (req, res) => {
    const data = {
        from: `${req.fields.firstname} ${req.fields.lastname} <${req.fields.email}>`,
        to: "cleca04@gmail.com",
        subject: `Formulaire de ${req.fields.firstname}`,
        text: req.fields.message,
    };

    mailgun.messages().send(data, (error, body) => {
        console.log(body);
        console.log(error);
        if (!error) {
            res.json({ message: "Formulaire bien reçu, email envoyé" });
        } else {
            res.json({ message: "Une erreur est survenue" });
        }
    });
});

app.get("/", (req, res) => {
    res.json({ message: "Bienvenue sur mon serveur dédié au formulaire" });
});
app.listen(process.env.PORT, () => {
    console.log("Server started");
});
