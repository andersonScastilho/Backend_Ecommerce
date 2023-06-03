import { Router } from 'express'

import loginRequired from '../middlewares/loginRequired'
import joiSchemaValidator from '../middlewares/joiSchemaValidator'

import requestController from '../controllers/RequestController'

import createRequestSchema from '../schemas/request/createRequestSchema'

const router = new Router()

router.post('/', loginRequired, joiSchemaValidator(createRequestSchema), requestController.store)
router.get('/', loginRequired, requestController.index)

router.delete('/:request_id', loginRequired, requestController.delete)

export default router