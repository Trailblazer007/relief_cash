import { formatErrorMessage } from "@/lib/auth/format-error-message";

interface Args {
  projectId: string;
  code: string;
  token: string;
}

export async function acceptMemberInvite({ token, projectId, code }: Args) {
  const res = await fetch(
    `${process.env.SERVER_URL}/projects/${projectId}/accept-member-invite`,
    {
      method: "POST",
      body: JSON.stringify({ code }),
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
