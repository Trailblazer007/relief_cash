import { formatErrorMessage } from "@/lib/auth/format-error-message";

interface Args {
  projectId: string;
  email: string;
  token: string;
}

export async function deleteInvite({ token, projectId, email }: Args) {
  const res = await fetch(
    `${process.env.SERVER_URL}/projects/${projectId}/delete-invite`,
    {
      method: "DELETE",
      body: JSON.stringify({ email }),
      headers: {
        "Content-type": "application/json",
        "x-access-token": `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  if (!res.ok) throw new Error(formatErrorMessage(data.message));

  return data;
}
