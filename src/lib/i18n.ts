import ko from "@/data/translations/ko.json";

type Messages = Record<string, string>;

const messagesByLocale: Record<string, Messages> = {
  ko: ko as Messages,
};

export function t(key: string, locale: string = "ko"): string {
  const dict = messagesByLocale[locale] ?? messagesByLocale.ko;
  return dict[key] ?? key;
}

