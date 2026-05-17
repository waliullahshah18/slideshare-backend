const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async (req, res) => {
    try {
        const url = req.query.url;

        if (!url) {
            return res.status(400).json({ error: "URL missing" });
        }

        const response = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        });

        const html = response.data;
        const $ = cheerio.load(html);

        const title = $("title").text() || "No title";
        const thumbnail =
            $('meta[property="og:image"]').attr("content") || "";

        res.status(200).json({
            title,
            thumbnail,
            download: url
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Backend crashed",
            message: error.message
        });
    }
};
