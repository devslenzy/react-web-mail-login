const { readdirSync } = require("fs");
const { connect } = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

readdirSync("./src/routes").forEach((category) => {
    readdirSync(`./src/routes/${category}`).forEach((file) => {
        if (!file.endsWith(".js")) return;

        const { baseUrl, method, route } = require(`./routes/${category}/${file}`);

        app[method](`/${baseUrl}/${route}`, async (req, res) => {
            try {
                await require(`./routes/${category}/${file}`).run(req, res);
            } catch (e) {
                console.error(e);
                res.status(500).send("An error occurred while processing the request");
            }
        });
    });
});

app.listen(parseFloat(process.env.PORT), () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
connect(process.env.MONGO).then(() => { console.log("Connected to MongoDB") });