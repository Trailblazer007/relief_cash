import { formatErrorMessage } from "@/lib/auth/format-error-message";

interface Args {
  token: string;
}

export async function fetchProjects({ token }: Args) {
  const res = await fetch(`${process.env.SERVER_URL}/projects`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "x-access-token": `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(formatErrorMessage(data.message));

  console.log(data);

  return data;
}
