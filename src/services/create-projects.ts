import { formatErrorMessage } from "@/lib/auth/format-error-message";

interface Args {
  name: string;
  members: {
    email: string;
    role: "employee" | "employer";
  }[];
  token: string;
}

export async function createProject({ token, ...args }: Args) {
  const res = await fetch(`${process.env.SERVER_URL}/projects/create`, {
    method: "POST",
    body: JSON.stringify(args),
    headers: {
      "Content-type": "application/json",
      "x-access-token": `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(formatErrorMessage(data.message));

  return data;
}
