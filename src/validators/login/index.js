import * as Joi from 'joi-browser'
import joiValidator from '../joiValidator'

const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).required()
})

const loginSchemaValidator = data => joiValidator(schema, data)
export default loginSchemaValidator