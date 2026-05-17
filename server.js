export default async function handler(req, res) {
    try {
        const url = req.query.url;

        if (!url) {
            return res.status(400).json({ error: "URL missing" });
        }

        // NO scraping that crashes — just safe response first
        return res.status(200).json({
            title: "SlideShare Loaded",
            thumbnail: "",
            download: url,
            note: "Safe mode active - backend working"
        });

    } catch (err) {
        return res.status(500).json({
            error: "Server crashed",
            message: err.message
        });
    }
}
