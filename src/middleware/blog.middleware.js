import Joi from 'joi';

const postSchema = Joi.object({
    title: Joi.string().min(10).max(50).required().messages({
        'string.min': 'Title must be at least 10 characters long.',
        'string.max': 'Title must be at most 50 characters long.',
        'string.empty': 'Title cannot be empty.',
        'any.required': 'Title is required.',
    }),
    content: Joi.string().min(20).max(3000).required().messages({
        'string.min': 'Content must be at least 20 characters long.',
        'string.max': 'Content must be at most 3000 characters long.',
        'string.empty': 'Content cannot be empty.',
        'any.required': 'Content is required.',
    }),
    excerpt: Joi.string().min(20).max(300).required().messages({
        'string.min': 'Excerpt must be at least 20 characters long.',
        'string.max': 'Excerpt must be at most 300 characters long.',
        'string.empty': 'Excerpt cannot be empty.',
        'any.required': 'Excerpt is required.',
    }),
    tags: Joi.array().items(Joi.string()).min(1).required().messages({
        'array.min': 'At least one tag is required.',
        'any.required': 'Tags are required.',
    }),
    coverImage: Joi.string().uri().required().messages({
        'string.uri': 'Cover image must be a valid URL.',
        'any.required': 'Cover image is required.',
    }),
});

const blogValidator = (req, res, next) => {
    const { error } = postSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const messages = error.details.map((detail) => detail.message);
        return res.status(400).json({
            success: false,
            message: 'Validation failed.',
            errors: messages,
        });
    }

    next();
};

export { postSchema, blogValidator };
