import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { productHandlerInput,idValidator, taskValidator} from "../middlewares/ProjectMiddleware";
import { TaskController } from "../controllers/TaskController";
import { validateProject } from "../middlewares/project";

const router = Router()
router.post('/',productHandlerInput,ProjectController.createProject)
router.get('/',ProjectController.getAllProjects)
router.get('/:id',idValidator,ProjectController.getProjectById)
router.put('/:id',idValidator,productHandlerInput,ProjectController.updateProject)
router.delete('/:id',idValidator,ProjectController.deleteProject)

/**Routing for task */
router.post('/:projectId/task',taskValidator,validateProject,TaskController.createTas)
router.get('/:projectId/task',idValidator,validateProject,TaskController.getProjectTasks)
router.get('/:projectId/task/:taskId',idValidator,validateProject,TaskController.getTaskById)
router.put('/:projectId/task/:taskId',idValidator,taskValidator,validateProject,TaskController.updateTask)
router.delete('/:projectId/task/:taskId',idValidator,validateProject,TaskController.delateTask)
export default router