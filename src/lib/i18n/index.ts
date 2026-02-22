import en from "./en";
import fa from "./fa";

export type Lang = "en" | "fa";
export type { Dictionary } from "./en";

export const dictionaries = { en, fa } as const;

export function getDictionary(lang: Lang) {
  return dictionaries[lang] ?? dictionaries.en;
}
