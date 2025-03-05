import mongoose, { Schema, Document, Types } from "mongoose";

const taskStatus = {
  PENDING: "pending",
  ON_HOLD: "onHold",
  IN_PROGRESS: "inPtogress",
  UNDER_REVIEW: "underReview",
  COMPLETE: "complete",
} as const;
//type to taskStatus
export type TaskAstatusProps = (typeof taskStatus)[keyof typeof taskStatus];
//Type for schema of task
export type TaskType = Document & {
  name: string;
  description: string;
  project: Types.ObjectId;
  status: TaskAstatusProps;
};
//Schema of data  into datable
export const TaskSchema = new Schema(
  {
    name: { type: String, require: true, trim: true },
    description: { type: String, require: true },
    project: { type: Types.ObjectId, ref: "ProjectModel" },
    status: {
      type: String,
      enum: Object.values(taskStatus),
      default: taskStatus.PENDING,
    },
  },
  { timestamps: true }
);
// TO EXPOUSE THE MODEL TO THE REST API
const TaskModel = mongoose.model<TaskType>("TaskModel", TaskSchema);
export default TaskModel;
