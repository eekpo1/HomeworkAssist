import { SubForum } from './subforum.model';

export interface Section {
  name: string;
  subForums: SubForum[];
}
