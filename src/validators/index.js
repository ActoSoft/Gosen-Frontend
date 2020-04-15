import * as Joi from 'joi-browser'

const userSchema = Joi.object().keys({
    id: Joi.number().optional(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    is_staff: Joi.optional()
})

const userAdminSchema = userSchema.append({
    is_staff: Joi.boolean().required()
})

const profileSchema = Joi.object().keys({
    id: Joi.optional(),
    phone_number: Joi.string().regex(/^[0-9]+$/, 'numbers').min(10).max(15),
    birth_date: Joi.string().required(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    gender: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    role: Joi.string().allow(''),
    zip_code: Joi.string().required().min(5).max(6),
    created: Joi.optional(),
    updated: Joi.optional(),
    deleted: Joi.optional(),
})

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).required()
})

const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required()
})

const resetPasswordSchema = Joi.object({
    password: Joi.string().min(6).required(),
    token: Joi.string().required()
})

const adminSchema = profileSchema.append({
    user: userAdminSchema
})

const employeeSchema = profileSchema.append({
    salary: Joi.string().regex(/^[0-9]+$/, 'numbers').required(),
    contract_date_start: Joi.string().required(),
    payment_type: Joi.string().required(),
    vigency: Joi.string().required(),
    user: userSchema,
    contracted_by: Joi.optional(),
    fired_date: Joi.optional(),
    fired_by: Joi.optional(),
    fired: Joi.optional(),
    active: Joi.optional(),
    available: Joi.optional()
})

const clientSchema = profileSchema.append({
    user: userSchema
})

const serviceSchema = Joi.object({
    id: Joi.optional(),
    name: Joi.string().required(),
    description: Joi.string().allow(''),
    cost: Joi.string().required(),
    payment_type: Joi.string().required(),
    works: Joi.optional(),
    created: Joi.optional(),
    updated: Joi.optional(),
    deleted: Joi.optional(),
})

const productSchema = Joi.object({
    id: Joi.optional(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    barcode: Joi.string().allow('').allow(null),
    images: Joi.optional(),
    stocks: Joi.optional(),
    created: Joi.optional(),
    updated: Joi.optional(),
    deleted: Joi.optional()
})

const productInStockSchema = Joi.object({
    stock: Joi.number().min(1).required(),
    product: Joi.number().min(1).required(),
    qty: Joi.number().min(1).required(),
})

const stockSchema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    description: Joi.string()
})

const workSchema = Joi.object({
    clientId: Joi.number().required(),
    serviceId: Joi.number().required(),
    employeesId: Joi.array().items(Joi.number()).min(1).required(),
    dateStart: Joi.string().required().min(4),
    dateEnd: Joi.string().required().min(4),
    description: Joi.string().required(),
    qty: Joi.number().min(1).required(),
    total: Joi.number().min(1).required(),
    payed: Joi.number().min(1).required(),
    toPay: Joi.number().min(1).required(),
    status: Joi.string().required(),
    id: Joi.alternatives().try(Joi.number(), null).required(),
    newEmployees: Joi.array().items(Joi.number()).optional(),
    removeEmployees: Joi.array().items(Joi.number()).optional()
})

const schemas = {
    user: userSchema,
    userAdmin: userAdminSchema,
    profile: profileSchema,
    login: loginSchema,
    forgotPassword: forgotPasswordSchema,
    resetPassword: resetPasswordSchema,
    admin: adminSchema,
    employee: employeeSchema,
    client: clientSchema,
    service: serviceSchema,
    product: productSchema,
    productInStock: productInStockSchema,
    stock: stockSchema,
    work: workSchema,
}

const validateRequest = async (schema, data) => {
    if (schemas[schema]) {
        const result = schemas[schema].validate(data, { abortEarly: false })
        if (result.error) {
            const errors = result.error.details.map(detail => {
                return detail.message
            })
            return { error: true, errors, message: null }
        } else {
            return { error: false }
        }
    } else {
        return { error: true, message: 'Schema not registered' }
    }
}

export {
    schemas,
    validateRequest
}