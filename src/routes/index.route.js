const express = require('express');
const router = express.Router();

// Routers
const toolbarRoutes = require("./toolbox.route")


router.use("/tools", toolbarRoutes)


module.exports = router