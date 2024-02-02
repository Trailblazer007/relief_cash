import { formatErrorMessage } from "@/lib/auth/format-error-message";

type Args = {
  projectId: string;
  token: string;
};

export async function fetchProjectByInvitation({
  token,
  projectId,
}: Args): Promise<ProjectType> {
  try {
    const url = `${process.env.SERVER_URL}/projects/${projectId}/by-invitation`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-access-token": `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(formatErrorMessage(data.message));

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
