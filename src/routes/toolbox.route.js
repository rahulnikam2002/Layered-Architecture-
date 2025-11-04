const express = require("express");
const ToolController = require("../controllers/ToolController");
const router = express.Router()

const toolController = new ToolController()

// localhost:5000/api/tools/
router.get("/", toolController.getAllTools)

// localhost:5000/api/tools/popular
router.get("/popular", toolController.getPopularTools)

// localhost:5000/api/tools/category/frontend
router.get('/category/:category', toolController.getToolsByCategory);

router.get('/:id', toolController.getToolById);

router.post('/create', toolController.createTool);

router.post('/create/bulk', toolController.createBulkTools);

router.put('/:id', toolController.updateTool);

router.delete('/delete/bulk', toolController.deleteBulkTools);

router.delete('/delete/:id', toolController.deleteTool);

module.exports = router