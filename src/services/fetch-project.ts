import { formatErrorMessage } from "@/lib/auth/format-error-message";

interface Args {
  token: string;
  projectId: string;
}

export async function fetchProject({ token, projectId }: Args) {
  const res = await fetch(`${process.env.SERVER_URL}/projects/${projectId}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "x-access-token": `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(formatErrorMessage(data.message));

  return data;
}
