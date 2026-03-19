import cards from "@/data/cards.json";

export function useCardData() {
  return {
    cards,
    loading: false,
    error: null as null | string,
  };
}

