/**
 * 「저장하기」버튼으로 같은 storageKey에 대해 짧은 시간에 여러 번 눌러도
 * Supabase upsert 요청이 한 번만 나가도록 묶습니다. (React Strict Mode 대비)
 *
 * 자동 저장은 없음 — 호출은 항상 사용자 클릭에서만 일어납니다.
 */

type InsertResult = { ok: true } | { ok: false; errorMessage: string };

const inflightByKey = new Map<string, Promise<InsertResult>>();

export function requestTarotResultCloudSave(
  storageKey: string,
  insertFn: () => Promise<{ error: Error | null }>,
): Promise<InsertResult> {
  if (typeof window !== "undefined") {
    const st = sessionStorage.getItem(storageKey);
    if (st === "1") {
      return Promise.resolve({ ok: true });
    }
  }

  const existing = inflightByKey.get(storageKey);
  if (existing) return existing;

  let settle!: (r: InsertResult) => void;
  const promise = new Promise<InsertResult>((resolve) => {
    settle = resolve;
  });

  inflightByKey.set(storageKey, promise);

  void (async () => {
    try {
      if (typeof window !== "undefined") {
        if (sessionStorage.getItem(storageKey) === "1") {
          settle({ ok: true });
          return;
        }
        sessionStorage.setItem(storageKey, "pending");
      }

      const { error } = await insertFn();

      if (typeof window !== "undefined") {
        if (error) {
          sessionStorage.removeItem(storageKey);
        } else {
          sessionStorage.setItem(storageKey, "1");
        }
      }

      if (error) {
        settle({ ok: false, errorMessage: error.message });
        return;
      }

      settle({ ok: true });
    } finally {
      inflightByKey.delete(storageKey);
    }
  })();

  return promise;
}
