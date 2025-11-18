import { DayBlock } from "./DayBlock";

export interface Day {
  id: number;
  date: string;
  blocks: DayBlock[];
}
