type UserType = {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  uid: string;
  updatedAt: Date;
  createdAt: Date;
};

type TaskType = {
  id: string;
  name: string;
  content: string;
  users: string[];
  dueDate: string;
};

type MemberType = {
  uid: string;
  firstName: string;
  lastName: string;
  salary: string;
  email: string;
  role: "employee" | "employer";
  signInHistory: Date[];
  payrollHistory: Date[];
};

type InvitationType = {
  email: string;
  role: "employee" | "employer";
  token: string;
};

type ProjectType = {
  name: string;
  projectId: string;
  tasks: TaskType[];
  members: MemberType[];
  invitations: InvitationType[];
  updatedAt: Date;
  createdAt: Date;
};
