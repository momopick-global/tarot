export type SavedReading = {
  id: string;
  masterId: string;
  card: number;
  titleEn: string;
  titleKo: string;
  createdAt: string;
};

export const SAVED_READING_STORAGE_KEY = "yourtarot.savedReadings";

export function readSavedReadings(): SavedReading[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SAVED_READING_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedReading[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function upsertSavedReading(input: SavedReading, limit = 50): SavedReading[] {
  const list = readSavedReadings();
  const next = list.filter((v) => v.id !== input.id);
  next.unshift(input);
  const trimmed = next.slice(0, limit);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(SAVED_READING_STORAGE_KEY, JSON.stringify(trimmed));
  }
  return trimmed;
}

export function removeSavedReading(id: string): SavedReading[] {
  const list = readSavedReadings();
  const next = list.filter((v) => v.id !== id);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(SAVED_READING_STORAGE_KEY, JSON.stringify(next));
  }
  return next;
}

export function clearSavedReadings(): SavedReading[] {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(SAVED_READING_STORAGE_KEY, JSON.stringify([]));
  }
  return [];
}
