export interface CorporateAuthUser {
  id: string;
  userId: string;
  name: string;
  role: string;
}

export interface CorporateAuthResponse {
  user: CorporateAuthUser;
  accessToken: string;
}

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:4000";
const corporateTokenKey = "cp_access_token";

const parseErrorMessage = async (response: Response) => {
  try {
    const data = await response.json();
    return data?.error?.message ?? "Request failed";
  } catch {
    return "Request failed";
  }
};

export const corporateTokenStorage = {
  get: () => (typeof window !== "undefined" ? window.sessionStorage.getItem(corporateTokenKey) : null),
  set: (token: string) => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(corporateTokenKey, token);
    }
  },
  clear: () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(corporateTokenKey);
    }
  }
};

export const loginCorporate = async (userId: string, password: string) => {
  const response = await fetch(`${apiBaseUrl}/api/auth/corporate/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ userId, password })
  });

  if (!response.ok) {
    const message = await parseErrorMessage(response);
    throw new Error(message);
  }

  const data = (await response.json()) as CorporateAuthResponse;
  corporateTokenStorage.set(data.accessToken);
  return data;
};

export const logoutCorporate = async () => {
  try {
    await fetch(`${apiBaseUrl}/api/auth/logout`, {
      method: "POST",
      credentials: "include"
    });
  } finally {
    corporateTokenStorage.clear();
  }
};