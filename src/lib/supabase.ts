export type SupabaseClient = {
  initialized: boolean;
};

let client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!client) {
    client = { initialized: true };
  }
  return client;
}

