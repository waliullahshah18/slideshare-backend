const express = require("express");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
app.use(cors());

app.get("/download", async (req, res) => {
    try {
        const url = req.query.url;

        if (!url) {
            return res.json({ error: "URL missing" });
        }

        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const title = $("title").text();
        const thumbnail = $('meta[property="og:image"]').attr("content");

        // NOTE: real download extraction is limited (basic version)
        const download = url;

        res.json({
            title,
            thumbnail,
            download
        });

    } catch (err) {
        res.json({ error: "Failed to fetch" });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});