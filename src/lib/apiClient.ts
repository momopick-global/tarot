type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export async function apiClient<T = unknown>(
  url: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    throw new Error(`API request failed: ${res.status}`);
  }

  return (await res.json()) as T;
}

export async function postJson<T = unknown>(
  url: string,
  body: JsonValue,
): Promise<T> {
  return apiClient<T>(url, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

