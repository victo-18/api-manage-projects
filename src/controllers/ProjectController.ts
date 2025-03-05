import { Request,Response } from "express"
import ProjectModel from "../models/projectModels"

//Controller responsible for managing CRUD methods in the database.
export class ProjectController{
 static createProject = async (req:Request,res:Response):Promise<void>=>{
     const project = new ProjectModel(req.body)
     try {
        await project.save()
        res.status(201).json({message:'The project has been created'})
     } catch (error) {
        console.error("There have been  an error while project was creating",error)
        res.status(500).json({ message: "Internal Server Error", error: error.message });
     }
 }
    static getAllProjects = async(req:Request,res:Response):Promise<void>=>{
      
      try {
         const projects = await ProjectModel.find({})
         res.status(200).json(projects)
      } catch (error) {
         console.error("The projects couldn't be retrieved.")
         res.status(500).json({ message: "Internal Server Error", error: error.message });
      }
    }
    static getProjectById = async(req:Request,res:Response):Promise<void>=>{
      const {id}=req.params
      try {
         const project = await ProjectModel.findById(id).populate('tasks')
         if(!project){
           res.status(404).json({message:"The project wasn't found"})
            return
         }
         res.status(200).json(project)
      } catch (error) {
         console.error("There was something wrong")
         res.status(500).json({ message: "Internal Server Error", error: error.message });
      }
    }

    static updateProject = async(req:Request,res:Response):Promise<void>=>{
      const {id}= req.params

      try {
         const project =await ProjectModel.findByIdAndUpdate(id,req.body)
         if(!project){
            res.status(404).json({message:"The project couldn't be found"})
            return
         }
         await project.save()
         res.status(200).json({message:"The project has been successfully updated."})
      } catch (error) {
         console.error("The project couldn't be updated",error)
         res.status(500).json({ message: "Internal Server Error", error: error.message });
      }
    }

    static deleteProject = async(req:Request,res:Response):Promise<void>=>{
      const {id}= req.params
      try {
         const project = await ProjectModel.findById(id)
         if(!project){
            res.status(404).json({message:"The project couldn't be found"})
            return
         }
         //Verificaciones aqui para poder eliminar un proyecto
         await project.deleteOne()
         res.status(200).json({message:'The project have been deleted'})
      } catch (error) {
         console.error("The project haven't delete",error)
         res.status(500).json({ message: "Internal Server Error", error: error.message });
      }
    }

}