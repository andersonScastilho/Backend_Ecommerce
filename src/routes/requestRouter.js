import { Router } from 'express'

import loginRequired from '../middlewares/loginRequired'

import requestController from '../controllers/RequestController'

const router = new Router()

router.post('/', loginRequired, requestController.store)
router.get('/', loginRequired, requestController.index)
router.delete('/:request_id', loginRequired, requestController.delete)

export default router