import { TimeStamp } from "./timestamp";

export interface Record {
  id?: string;
  createdAt?: TimeStamp;
  updatedAt?: TimeStamp;
}
