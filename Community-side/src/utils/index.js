import { useSessionStorage } from "./sessionStorage";

export const {
  clearSession,
  getSessionItem,
  removeSessionItem,
  setSessionItem,
} = useSessionStorage;
