

function validateWithZod(schema, data) {
    return schema.safeParse(data);
}

function handleZod(res, result, next) {
    if (!result.success) {
        const errors = result.error.flatten(); // format the errors of zod
        console.log(" zod error " + errors);
        return res.json({ error: errors });
    }
    return next();
}

module.exports = { validateWithZod, handleZod }