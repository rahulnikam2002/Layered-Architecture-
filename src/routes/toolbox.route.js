const express = require("express");
const router = express.Router()


router.get("/", (req, res) => {
    res.json({
        success: false,
        message: "Toolbox API is working!"
    })
})

module.exports = router