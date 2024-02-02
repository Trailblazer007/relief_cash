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
  role: { type: String, enum: ["employee", "employer"], required: true },
});
const invitationSchema = new Schema<InvitationType>({
  role: { type: String, enum: ["employee", "employer"], required: true },
  token: { type: String, required: true },
});

const projectSchema = new Schema<ProjectType>(
  {
    name: { type: String, required: true },
    tasks: { type: [taskSchema], required: true, default: [] },
    members: { type: [memberSchema], required: true, default: [] },
    invitations: { type: [invitationSchema], required: true, default: [] },
  },
  { timestamps: true }
);
export const Project = models.User || model("Projects", projectSchema);
