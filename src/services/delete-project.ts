import { formatErrorMessage } from "@/lib/auth/format-error-message";

interface Args {
  projectId: string;
  token: string;
}

export async function deleteProject({ token, ...args }: Args) {
  const res = await fetch(`${process.env.SERVER_URL}/projects/delete`, {
    method: "DELETE",
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
