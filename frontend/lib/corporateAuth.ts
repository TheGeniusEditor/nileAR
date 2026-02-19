export interface CorporateAuthUser {
  id: string;
  userId: string;
  name: string;
  role: string;
}

export interface CorporateProfile {
  name: string;
  registrationNumber: string | null;
  address: string | null;
  contactEmail: string | null;
  phone: string | null;
}

export interface CorporateAuthResponse {
  user: CorporateAuthUser;
  mustSetPassword?: boolean;
  accessToken: string;
}

export interface CorporateProfileResponse {
  user: CorporateAuthUser;
  profile: CorporateProfile;
  mustSetPassword: boolean;
}

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:4000";
const corporateTokenKey = "cp_access_token";

const parseErrorMessage = async (response: Response) => {
  try {
    const data = await response.json();
    const fieldErrors = data?.error?.details?.fieldErrors;
    if (fieldErrors && typeof fieldErrors === "object") {
      const firstField = Object.keys(fieldErrors).find((key) => Array.isArray(fieldErrors[key]) && fieldErrors[key].length > 0);
      if (firstField) {
        return fieldErrors[firstField][0] as string;
      }
    }

    const formErrors = data?.error?.details?.formErrors;
    if (Array.isArray(formErrors) && formErrors.length > 0) {
      return formErrors[0] as string;
    }

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

const getCorporateAuthHeaders = () => {
  const token = corporateTokenStorage.get();
  if (!token) {
    throw new Error("Unauthorized");
  }

  return {
    Authorization: `Bearer ${token}`
  };
};

export const loginCorporate = async (username: string, password: string) => {
  const response = await fetch(`${apiBaseUrl}/api/auth/corporate/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  if (!response.ok) {
    const message = await parseErrorMessage(response);
    throw new Error(message);
  }

  const data = (await response.json()) as CorporateAuthResponse;
  corporateTokenStorage.set(data.accessToken);
  return data;
};

export const fetchCorporateProfile = async () => {
  const response = await fetch(`${apiBaseUrl}/api/auth/corporate/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      ...getCorporateAuthHeaders()
    }
  });

  if (!response.ok) {
    const message = await parseErrorMessage(response);
    throw new Error(message);
  }

  return (await response.json()) as CorporateProfileResponse;
};

export const updateCorporateProfile = async (payload: {
  name: string;
  registrationNumber?: string;
  address?: string;
  contactEmail?: string;
  phone?: string;
}) => {
  const response = await fetch(`${apiBaseUrl}/api/auth/corporate/profile`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...getCorporateAuthHeaders()
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const message = await parseErrorMessage(response);
    throw new Error(message);
  }

  return (await response.json()) as CorporateProfileResponse;
};

export const setCorporatePassword = async (newPassword: string, confirmPassword: string) => {
  const response = await fetch(`${apiBaseUrl}/api/auth/corporate/set-password`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...getCorporateAuthHeaders()
    },
    body: JSON.stringify({ newPassword, confirmPassword })
  });

  if (!response.ok) {
    const message = await parseErrorMessage(response);
    throw new Error(message);
  }

  return (await response.json()) as { ok: boolean; mustSetPassword: boolean };
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