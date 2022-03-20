export interface KeyResult {
  description: string;
}

export interface Okr {
  name: string;
  keyresults: KeyResult[];
  user_id: string;
  due_at?: Date;
}
