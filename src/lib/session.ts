// Stable per-device session id used to dedupe likes and gate edit access
const KEY = "wedding_session_id";

export const getSessionId = (): string => {
  try {
    let id = localStorage.getItem(KEY);
    if (!id) {
      id =
        (crypto?.randomUUID?.() as string) ||
        `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem(KEY, id);
    }
    return id;
  } catch {
    return "anon_fallback_session";
  }
};
