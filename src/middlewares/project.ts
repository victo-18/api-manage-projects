import { Request,Response,NextFunction } from "express";
import ProjectModel, { ProjectType } from "../models/projectModels";
//Expretion to add the project to the request
declare global {
    namespace Express{
        interface Request{
            project:ProjectType
        }
    }
}
/**
 * Function to validate the ṕroject
 * @param req  reuest
 * @param res  response
 * @param next  next function
 * @returns     void
 */
export const validateProject= async(req:Request,res:Response,next:NextFunction)=>{

    try {
        const { projectId } = req.params;
        if (!projectId) {
            res.status(400).json({ message: "The project id is required" });
            return;
          }
          //To validate the project exists
          const project = await ProjectModel.findById(projectId);
          if (!project) {
            res.status(404).json({ message: "The project was no found" });
            return;
          }
          //To add the project to the request
        req.project = project;
        next()
    } catch (error) {
        res.status(500).json({error:"An error ocurred while validating the project"})
        console.error("An error ocurred",error)
        
    }
}