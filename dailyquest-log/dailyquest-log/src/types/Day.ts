import { DayBlock } from "./DayBlock";

export interface Day {
  id: string;
  date: string;
  blocks: DayBlock[];
}
