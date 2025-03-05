import TaskModel, { TaskSchema } from "../models/taskModels";
import { Request, Response } from "express";
import { Types } from "mongoose";
import { assert } from "node:console";
import ProjectModel from "../models/projectModels";

export class TaskController {
  static createTas = async (req: Request, res: Response): Promise<void> => {
    try {
      //create a new taask
      const task = new TaskModel(req.body);
      task.project = req.project._id as Types.ObjectId;
      // add.the task to the project
      req.project.tasks.push(task.id);
      await Promise.allSettled([task.save(), req.project.save()]);
      res.status(201).json({ message: "The task has been created" });
    } catch (error) {
      res.status(500).json({ message: "The task couldn't be create" });
    }
  };
  static getProjectTasks = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      //Getting all the tasks of the project
      const tasks = await TaskModel.find({ project: req.project._id }).populate(
        "project"
      );
      //Getting the project information
      //const project=req.project

      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ messge: "The task couldnt be fitching" });
    }
  };
  static getTaskById = async (req: Request, res: Response): Promise<void> => {
    try {
      const task = await TaskModel.findById(req.params.taskId).populate(
        "project"
      );
      if (!task) {
        res.status(404).json({ message: "The task was not found" });
        return;
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ messge: "The task couldnt be fitching" });
    }
  };
  static updateTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const task = await TaskModel.findById(
        req.params.taskId
      );
      if (!task) {
        res.status(404).json({ message: "The task wasn't found" });
        return;
      }
      if(req.params.projectId!==task.project.toString()){
        res.status(400).json({message:"The task doesn't belong to the project"})
        return
      }
      task.name = req.body.name;
      task.description= req.body.description;
      await task.save()
      res.status(200).json({ message: "The task haas been updated" });
    } catch (error) {
      res.status(500).json({ messge: "The task couldnt be fitching" });
    }
  };
  static delateTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const delateTask = await TaskModel.findById(req.params.taskId);
      const project = await ProjectModel.findById(req.params.projectId);
      if (!delateTask) {
        res.status(404).json({ message: "The task wasn't found" });
        return;
      }
      if (!project) {
        res.status(404).json({ Message: "The project wasn't exist" });
        return;
      }
      // Filtrar las tareas del proyecto
      project.tasks = Array.isArray(project.tasks)
        ? project.tasks.filter((task) => task.toString() !== req.params.taskId)
        : [];
      await Promise.allSettled([project.save(), delateTask.deleteOne()]);
      res.status(200).json({ message: "The task has been deleted" });
    } catch (error) {
      res.status(500).json({ erorr: "The task couldnt be deleted" });
    }
  };
}
