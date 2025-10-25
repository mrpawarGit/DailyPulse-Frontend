const API_BASE_URL =
  (import.meta as any).env.VITE_API_URL || "http://localhost:3000/api";

// Helper function to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem("authToken");
};

// Helper function to build headers
const getHeaders = (includeAuth = true): HeadersInit => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return headers;
};

// Helper function to handle responses
const handleResponse = async (response: Response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

// ============================================
// AUTHENTICATION APIs
// ============================================

export const authApi = {
  signup: async (name: string, email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: getHeaders(false),
      body: JSON.stringify({ name, email, password }),
    });
    return handleResponse(response);
  },

  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: getHeaders(false),
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

  getMe: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  updateProfile: async (name?: string, settings?: any) => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({ name, settings }),
    });
    return handleResponse(response);
  },
};

// ============================================
// HABITS APIs
// ============================================

export const habitApi = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/habits`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  getOne: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/habits/${id}`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  create: async (habitData: any) => {
    const response = await fetch(`${API_BASE_URL}/habits`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(habitData),
    });
    return handleResponse(response);
  },

  update: async (id: string, habitData: any) => {
    const response = await fetch(`${API_BASE_URL}/habits/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(habitData),
    });
    return handleResponse(response);
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/habits/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  toggleArchive: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/habits/${id}/archive`, {
      method: "PATCH",
      headers: getHeaders(),
    });
    return handleResponse(response);
  },
};

// ============================================
// LOGS APIs
// ============================================

export const logApi = {
  createOrUpdate: async (
    habitId: string,
    date: string,
    progress: number,
    notes?: string
  ) => {
    const response = await fetch(`${API_BASE_URL}/logs`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ habitId, date, progress, notes }),
    });
    return handleResponse(response);
  },

  getToday: async () => {
    const response = await fetch(`${API_BASE_URL}/logs/today`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  getByDate: async (date: string) => {
    const response = await fetch(`${API_BASE_URL}/logs/date/${date}`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  getByHabit: async (habitId: string) => {
    const response = await fetch(`${API_BASE_URL}/logs/habit/${habitId}`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  getByDateRange: async (startDate: string, endDate: string) => {
    const response = await fetch(
      `${API_BASE_URL}/logs/range?startDate=${startDate}&endDate=${endDate}`,
      { headers: getHeaders() }
    );
    return handleResponse(response);
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/logs/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return handleResponse(response);
  },
};

// ============================================
// MOODS APIs
// ============================================

export const moodApi = {
  createOrUpdate: async (date: string, mood: string, notes?: string) => {
    const response = await fetch(`${API_BASE_URL}/moods`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ date, mood, notes }),
    });
    return handleResponse(response);
  },

  getToday: async () => {
    const response = await fetch(`${API_BASE_URL}/moods/today`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  getByDateRange: async (startDate: string, endDate: string) => {
    const response = await fetch(
      `${API_BASE_URL}/moods/range?startDate=${startDate}&endDate=${endDate}`,
      { headers: getHeaders() }
    );
    return handleResponse(response);
  },
};

// ============================================
// ANALYTICS APIs
// ============================================

export const analyticsApi = {
  getOverview: async () => {
    const response = await fetch(`${API_BASE_URL}/analytics/overview`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  getTrends: async (days: number = 7) => {
    const response = await fetch(
      `${API_BASE_URL}/analytics/trends?days=${days}`,
      {
        headers: getHeaders(),
      }
    );
    return handleResponse(response);
  },

  getCategoryBreakdown: async () => {
    const response = await fetch(
      `${API_BASE_URL}/analytics/category-breakdown`,
      {
        headers: getHeaders(),
      }
    );
    return handleResponse(response);
  },

  getMoodStats: async (days: number = 30) => {
    const response = await fetch(
      `${API_BASE_URL}/analytics/mood-stats?days=${days}`,
      {
        headers: getHeaders(),
      }
    );
    return handleResponse(response);
  },

  getBestHabits: async (days: number = 30) => {
    const response = await fetch(
      `${API_BASE_URL}/analytics/best-habits?days=${days}`,
      {
        headers: getHeaders(),
      }
    );
    return handleResponse(response);
  },
};

// ============================================
// MOTIVATION APIs (Public)
// ============================================

export const motivationApi = {
  getQuote: async () => {
    const response = await fetch(`${API_BASE_URL}/motivation/quote`, {
      headers: getHeaders(false),
    });
    return handleResponse(response);
  },

  getTips: async () => {
    const response = await fetch(`${API_BASE_URL}/motivation/tips`, {
      headers: getHeaders(false),
    });
    return handleResponse(response);
  },
};
