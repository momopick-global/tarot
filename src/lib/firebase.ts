export type FirebaseClient = {
  initialized: boolean;
};

let client: FirebaseClient | null = null;

export function getFirebaseClient(): FirebaseClient {
  if (!client) {
    client = { initialized: true };
  }
  return client;
}

