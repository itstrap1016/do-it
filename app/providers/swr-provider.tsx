"use client";

import { SWRConfig } from "swr";

export function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false, // 포커스 시 재검증 비활성화
        revalidateOnReconnect: true, // 네트워크 재연결 시 재검증
        dedupingInterval: 60000, // 1분간 중복 요청 방지
        errorRetryCount: 3, // 에러 시 최대 3번 재시도
        errorRetryInterval: 5000, // 재시도 간격 5초
      }}
    >
      {children}
    </SWRConfig>
  );
}
