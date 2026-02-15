export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
}

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

const parseErrorMessage = async (response: Response) => {
  try {
    const data = await response.json();
    return data?.error?.message ?? "Request failed";
  } catch {
    return "Request failed";
  }
};

const request = async <T>(path: string, options: RequestInit) => {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {})
    }
  });

  if (!response.ok) {
    const message = await parseErrorMessage(response);
    throw new Error(message);
  }

  return (await response.json()) as T;
};

const tokenKey = "hf_access_token";

export const tokenStorage = {
  get: () => (typeof window !== "undefined" ? window.sessionStorage.getItem(tokenKey) : null),
  set: (token: string) => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(tokenKey, token);
    }
  },
  clear: () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(tokenKey);
    }
  }
};

export const login = async (email: string, password: string) => {
  const result = await request<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });

  tokenStorage.set(result.accessToken);
  return result;
};

export const register = async (email: string, password: string, fullName?: string) => {
  const result = await request<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, fullName })
  });

  tokenStorage.set(result.accessToken);
  return result;
};

export const logout = async () => {
  await request<{ ok: boolean }>("/api/auth/logout", { method: "POST" });
  tokenStorage.clear();
};
