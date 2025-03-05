import mongoose, { Schema, Document,PopulatedDoc,Types } from "mongoose";
import { TaskType } from "./taskModels";

//This is the type for typescript
export type ProjectType = Document & {
  projectName: string;
  clientName: string;
  description: string;
  tasks:PopulatedDoc<TaskType & Document>[]
};
//Schema to monggose model
const ProjectSchema = new Schema({
  projectName: { type: String, require:true,trim:true },
  clientName: { type: String,require:true,trim:true },
  description: { type: String,require:true,trim:true },
  tasks:[
    {type:Types.ObjectId,
      ref:'TaskModel'
    }
  ]
},{timestamps:true});
//Integration between model and type
const ProjectModel= mongoose.model<ProjectType>('ProjectModel',ProjectSchema)
export default ProjectModel;
