export interface KeyResult {
  description: string;
}

export interface Okr {
  name: string;
  keyresults: KeyResult[];
  dueAt?: Date;
}
