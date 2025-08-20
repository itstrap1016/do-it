const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const API_ID = process.env.NEXT_PUBLIC_API_ID;

export interface TodoItem {
  id: number;
  name: string;
  isCompleted: boolean;
  tenantId?: string;
  memo?: string;
  imageUrl?: string;
}

export interface CreateTodoRequest {
  name: string;
}

export interface UpdateTodoRequest {
  name?: string;
  isCompleted?: boolean;
  memo?: string;
  imageUrl?: string;
}

// 공통 fetch 래퍼
async function apiRequest<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

// Todo 관련 API 함수들
export const todoAPI = {
  // 할 일 추가
  createTodo: (data: CreateTodoRequest): Promise<TodoItem> =>
    apiRequest(`/${API_ID}/items`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // 할 일 목록 조회
  getTodos: (): Promise<TodoItem[]> => apiRequest(`/${API_ID}/items`),

  // 할 일 삭제
  deleteTodo: (id: number): Promise<void> =>
    apiRequest(`/${API_ID}/items/${id}`, {
      method: "DELETE",
    }),

  // 할 일 업데이트 추가
  updateTodo: (id: number, data: UpdateTodoRequest): Promise<TodoItem> =>
    apiRequest(`/${API_ID}/items/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
};
