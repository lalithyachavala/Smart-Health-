const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/predict", (req, res) => {
    const { symptoms, bp, sugar, temperature } = req.body;

    let disease = "Unknown";
    if (symptoms.includes("fever") && temperature > 100) {
        disease = "Viral Infection";
    } else if (sugar > 140) {
        disease = "Diabetes";
    } else if (bp > 140) {
        disease = "Hypertension";
    }

    res.json({ prediction: disease });
});

app.listen(5000, () => {
    console.log("Backend server running on http://localhost:5000");
});
