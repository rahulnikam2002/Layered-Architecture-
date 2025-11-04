const ToolService = require("../services/ToolService")


class ToolController {
    constructor() {
        this.toolService = new ToolService()
    }
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * 
     * - /api/tools?category='Frontend'&popular=true&limit=10
     * - /api/tools?category='Frontend'&limit=10
     */
    getAllTools = async (req, res) => {
        try {
            const { category, popular, search, limit, skip, sort } = req.query;

            const filters = {};
            if (category) filters.category = category;
            if (popular === 'true') filters.isPopular = true

            const options = {};
            if (limit) options.limit = parseInt(limit);
            if (skip) options.skip = parseInt(skip);
            // if (sort) {
            //     // HOMEWORK
            // }

            let tools;

            if (search) {
                tools = await this.toolService.searchTools(search)
            }
            else {
                tools = await this.toolService.getAllTools(filters, options)
            }

            res.status(200).json({
                success: true,
                count: tools.length,
                data: tools
            })


        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    createTool = async (req, res) => {
        try {
            const toolData = req.body;

            const tool = await this.toolService.createTool(toolData)

            res.status(201).json({
                success: true,
                message: 'Tool created successfully',
                data: tool
            })

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    getToolById = async (req, res) => {
        try {
            const { id } = req.params;
            const tool = await this.toolService.getToolById(id);

            res.status(200).json({
                success: true,
                data: tool
            });
        } catch (error) {
            const statusCode = error.message.includes('not found') ? 404 : 500;
            res.status(statusCode).json({
                success: false,
                message: error.message
            });
        }
    }

    createBulkTools = async (req, res) => {
        try {
            const { tools } = req.body;

            if (!Array.isArray(tools)) {
                return res.status(400).json({
                    success: false,
                    message: 'Tools should be an array'
                });
            }

            const results = await this.toolService.createBulkTools(tools);

            const statusCode = results.failed.length === 0 ? 201 : 207;

            res.status(statusCode).json({
                success: true,
                message: `Bulk operation completed. ${results.created.length} created, ${results.failed.length} failed`,
                data: results
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    updateTool = async (req, res) => {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const tool = await this.toolService.updateTool(id, updateData);

            res.status(200).json({
                success: true,
                message: 'Tool updated successfully',
                data: tool
            });
        } catch (error) {
            const statusCode = error.message.includes('not found') ? 404 :
                error.message.includes('Validation failed') ? 400 : 500;
            res.status(statusCode).json({
                success: false,
                message: error.message
            });
        }
    }

    deleteTool = async (req, res) => {
        try {
            const { id } = req.params;
            const tool = await this.toolService.deleteTool(id);

            res.status(200).json({
                success: true,
                message: 'Tool deleted successfully',
                data: tool
            });
        } catch (error) {
            const statusCode = error.message.includes('not found') ? 404 : 500;
            res.status(statusCode).json({
                success: false,
                message: error.message
            });
        }
    }

    deleteBulkTools = async (req, res) => {
        try {
            const { ids } = req.body;

            if (!Array.isArray(ids)) {
                return res.status(400).json({
                    success: false,
                    message: 'IDs should be an array'
                });
            }

            const results = await this.toolService.deleteBulkTools(ids);

            const statusCode = results.failed.length === 0 ? 200 : 207;

            res.status(statusCode).json({
                success: true,
                message: `Bulk deletion completed. ${results.deleted.length} deleted, ${results.failed.length} failed`,
                data: results
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    getToolsByCategory = async (req, res) => {
        try {
            const { category } = req.params;
            const tools = await this.toolService.getToolsByCategory(category);

            res.status(200).json({
                success: true,
                count: tools.length,
                data: tools
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    getPopularTools = async (req, res) => {
        try {
            const tools = await this.toolService.getPopularTools();

            res.status(200).json({
                success: true,
                count: tools.length,
                data: tools
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = ToolController;