import { Router } from 'express'
import authenticate from '../../middlewares/authenticate';
import todoController from './todo.controller';

const router=Router();

router.route('/create').post(authenticate,todoController.Addtodo)
router.route('/update/:todoid').patch(authenticate,todoController.updatetodo)
router.route('/get').get(authenticate,todoController.Gettodo)
router.route('/delete/:todoid').delete(authenticate,todoController.deletetodo)

export default router
