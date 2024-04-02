/**
 * API 응답의 공통 구조를 정의하는 인터페이스.
 * 모든 API 응답은 이 구조를 기반으로 확장됩니다.
 */
interface ResponseBodyDefault {
  dateTime: string;
  version: string;
  status: {
    code: string;
    message: string;
  };
}

/**
 * API 응답의 공통 페이지네이션을 정의하는 인터페이스.
 * 모든 페이지네이션 관련 API 응답은 이 구조를 기반으로 확장됩니다.
 */
interface Pagination {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export type { Pagination, ResponseBodyDefault };
