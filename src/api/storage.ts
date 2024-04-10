export interface storageProps {
  key: string;
  persist: boolean;
  value?: string | "";
}

/**
 * 스토리지 속성 타입 정의.
 * @typedef {Object} storageProps
 * @property {string} key - 스토리지 항목의 키.
 * @property {boolean} persist - 스토리지가 영구적인지 여부.
 * @property {string} [value=""] - 스토리지 항목의 값.
 */

/**
 * 스토리지 내부 속성 타입 정의.
 * @typedef {Object} storageInnerProps
 * @property {Function} set - 스토리지 항목을 설정하는 함수.
 * @property {Function} get - 스토리지 항목을 가져오는 함수.
 * @property {Function} has - 스토리지 항목이 존재하는지 확인하는 함수.
 */

/**
 * 세션 스토리지와 로컬 스토리지와 상호 작용하는 메서드를 제공하는 스토리지 객체.
 * @type {storageInnerProps}
 */
export const Storage = {
  /**
   * 스토리지 항목을 설정합니다.
   * @param {storageProps} params - 스토리지 항목 속성.
   */
  set: ({ key, persist, value }: storageProps) => {
    if (persist === true) {
      sessionStorage.setItem(key, value || "");
    }
    if (persist === false) {
      localStorage.setItem(key, value || "");
    }
  },
  /**
   * 스토리지 항목을 가져옵니다.
   * @param {storageProps} params - 스토리지 항목 속성.
   * @returns {string | undefined | null} 스토리지 항목의 값.
   */
  get: ({ key, persist }: storageProps) => {
    if (persist === true) {
      return sessionStorage.getItem(key);
    }
    if (persist === false) {
      return localStorage.getItem(key);
    }
  },
  /**
   * 스토리지 항목이 존재하는지 확인합니다.
   * @param {storageProps} params - 스토리지 항목 속성.
   * @returns {boolean | undefined} 스토리지 항목이 존재하는지 여부.
   */
  has: ({ key, persist }: storageProps) => {
    if (persist === true) {
      return !!sessionStorage.getItem(key)?.valueOf();
    }
    if (persist === false) {
      return !!localStorage.getItem(key)?.valueOf();
    }
  },
};
