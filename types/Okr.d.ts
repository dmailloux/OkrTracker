import { KeyResult } from "./KeyResult";

export interface Okr {
  name: string;
  keyresults: KeyResult[];
  user_id: string;
  due_at?: Date;
}
