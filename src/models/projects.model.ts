import { Schema, model, models } from "mongoose";

const taskSchema = new Schema<TaskType>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  content: { type: String, required: true },
  users: { type: [String], required: true },
  dueDate: { type: String, required: true },
});

const memberSchema = new Schema<MemberType>({
  uid: { type: String, required: true },
  firstName: {
    type: String,
    required: true,
    min: 3,
  },
  lastName: {
    type: String,
    required: true,
    min: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: { type: String, enum: ["employee", "employer"], required: true },
  salary: { type: String },
  signInHistory: { type: [Date], default: [] },
  payrollHistory: { type: [Date], default: [] },
});
const invitationSchema = new Schema<InvitationType>({
  role: { type: String, enum: ["employee", "employer"], required: true },
  email: { type: String, required: true },
  token: { type: String, required: true },
});

const projectSchema = new Schema<ProjectType>(
  {
    name: { type: String, required: true },
    projectId: { type: String, required: true },
    tasks: { type: [taskSchema], required: true, default: [] },
    members: { type: [memberSchema], required: true, default: [] },
    invitations: { type: [invitationSchema], required: true, default: [] },
  },
  { timestamps: true }
);
export const Project = models.Project || model("Project", projectSchema);
