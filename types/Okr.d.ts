import { KeyResult } from "./KeyResult";

export interface Okr {
  id: string;
  name: string;
  keyresults: KeyResult[];
  user_id: string;
  due_at?: Date;
}
