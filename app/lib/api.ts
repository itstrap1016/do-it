const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const API_ID = process.env.NEXT_PUBLIC_API_ID;

// Todo 아이템의 기본 구조를 정의하는 인터페이스
export interface TodoItem {
  id: number;
  name: string;
  isCompleted: boolean;
  tenantId?: string;
  memo?: string;
  imageUrl?: string;
}

// 새로운 Todo 생성 시 사용하는 요청 데이터 구조
export interface CreateTodoRequest {
  name: string;
}

// Todo 업데이트 시 사용하는 요청 데이터 구조
export interface UpdateTodoRequest {
  name?: string;
  isCompleted?: boolean;
  memo?: string;
  imageUrl?: string;
}

interface ImageUploadResponse {
  url: string;
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
  // Todo 추가
  createTodo: (data: CreateTodoRequest): Promise<TodoItem> =>
    apiRequest(`/${API_ID}/items`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Todo 목록 조회
  getTodos: (): Promise<TodoItem[]> => apiRequest(`/${API_ID}/items`),

  // Todo 삭제
  deleteTodo: (id: number): Promise<void> =>
    apiRequest(`/${API_ID}/items/${id}`, {
      method: "DELETE",
    }),

  // Todo 업데이트 추가
  updateTodo: (id: number, data: UpdateTodoRequest): Promise<TodoItem> =>
    apiRequest(`/${API_ID}/items/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  getTodoById: (id: number): Promise<TodoItem> =>
    apiRequest(`/${API_ID}/items/${id}`),

  // 이미지 업로드
  uploadImage: async (imageFile: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch(`${BASE_URL}/${API_ID}/images/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Image upload failed: ${response.status}`);
    }

    const data: ImageUploadResponse = await response.json();
    return data.url;
  },
};
