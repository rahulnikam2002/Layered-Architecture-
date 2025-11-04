const ToolRepository = require("../repositories/ToolRepository")

/**
 * Business logic
 */
class ToolService {
    constructor() {
        this.toolRepository = new ToolRepository()
    }

    /**
     * Creates new tool
     * @param {*} toolData 
     * @returns 
     */
    async createTool(toolData) {
        try {
            const existingTool = await this.toolRepository.findByName(toolData.name)

            if (existingTool) {
                throw new Error('Tool with this name already exists');
            }

            const savedTool = await this.toolRepository.create(toolData)

            return savedTool

        } catch (error) {
            throw new Error(`Failed to create new tool: ${error.message}`)
        }
    }


    async createBulkTools(toolsData) {
        const result = {
            created: [],
            failed: [],
            total: toolsData.length
        }

        for (const toolData of toolsData) {
            try {
                const createdTool = await this.createTool(toolData)
                result.created.push(createdTool)
            } catch (error) {
                result.failed.push({
                    data: toolData,
                    error: error.message
                })
            }
        }

        return result
    }

    async getAllTools(filters = {}, options = {}) {
        try {
            const tools = await this.toolRepository.findAll(filters, options);
            return tools;
        } catch (error) {
            throw new Error(`Failed to fetch tools: ${error.message}`);
        }
    }

    async getToolById(id) {
        try {
            const tool = await this.toolRepository.findById(id);
            if (!tool) {
                throw new Error('Tool not found');
            }
            return tool;
        } catch (error) {
            throw new Error(`Failed to fetch tool: ${error.message}`);
        }
    }

    async updateTool(id, updateData) {
        try {
            const tool = await this.toolRepository.updateById(id, updateData);

            if (!tool) {
                throw new Error('Tool not found');
            }

            return tool;
        } catch (error) {
            if (error.name === 'ValidationError') {
                const messages = Object.values(error.errors).map(err => err.message);
                throw new Error(`Validation failed: ${messages.join(', ')}`);
            }
            throw new Error(`Failed to update tool: ${error.message}`);
        }
    }

    async deleteTool(id) {
        try {
            const tool = await this.toolRepository.deleteById(id);
            if (!tool) {
                throw new Error('Tool not found');
            }
            return tool;
        } catch (error) {
            throw new Error(`Failed to delete tool: ${error.message}`);
        }
    }

    async deleteBulkTools(ids) {
        const results = {
            deleted: [],
            failed: [],
            total: ids.length
        };

        for (const id of ids) {
            try {
                const deletedTool = await this.deleteTool(id);
                results.deleted.push(deletedTool);
            } catch (error) {
                results.failed.push({
                    id,
                    error: error.message
                });
            }
        }

        return results;
    }

    async getToolsByCategory(category) {
        try {
            const tools = await this.toolRepository.findByCategory(category);
            return tools;
        } catch (error) {
            throw new Error(`Failed to fetch tools by category: ${error.message}`);
        }
    }

    async getPopularTools() {
        try {
            const tools = await this.toolRepository.findPopular();
            return tools;
        } catch (error) {
            throw new Error(`Failed to fetch popular tools: ${error.message}`);
        }
    }

    async searchTools(query) {
        try {
            const tools = await this.toolRepository.search(query);
            return tools;
        } catch (error) {
            throw new Error(`Failed to search tools: ${error.message}`);
        }
    }

}

module.exports = ToolService