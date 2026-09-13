export type MonthTotal = {
  month: string;
  total: number;
};

export type CategoryDelta = {
  category: string;
  current: number;
  previous: number;
  delta: number;
};

export type AnalyzeResponse = {
  months: MonthTotal[];
  growth_pct: number | null;
  category_deltas: CategoryDelta[];
  insight: string;
};

export type AskResponse = {
  answer: string;
};
