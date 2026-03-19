import masters from "@/data/masters.json";

export function useMasterData() {
  return {
    masters,
    loading: false,
    error: null as null | string,
  };
}

