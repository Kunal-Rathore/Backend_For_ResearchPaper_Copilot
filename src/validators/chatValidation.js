
const { z } = require("zod");


const querySchema = z.object({
    query: z.string()
        .min(5)
        .max(200)
});

module.exports = querySchema