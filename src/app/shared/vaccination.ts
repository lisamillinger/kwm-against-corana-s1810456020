import { People } from "./people";
export { People } from "./people";
import { Location } from "./location";
export { Location } from "./location";

export class Vaccination {
  constructor(
    public id: number,
    public key: string,
    public information: string,
    public date: Date,
    public max_registrations: number,
    public current_registrations: number,
    public isFull: boolean,
    public locations?: Location[],
    public people?: People[]
  ) {}
}
