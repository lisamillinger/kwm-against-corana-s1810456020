import { Injectable } from "@angular/core";
import { Vaccination, People, Location} from "./vaccination";

@Injectable()
export class VaccinationStoreService {

  vaccinations: Vaccination[];
  constructor() {
    this.vaccinations = [
      new Vaccination(1,
      'IMPFUNG887',
      'some information',
      new Date(2021-22-8),
      88,
      77,
      false,
      [new Location(1,
      5020,
      'Zaunergasse 11',
      'Salzburg'
      )],
      [new People(1,
      'Maximiliane',
      'Musterfrau',
      new Date(1999-1-1),
      'female',
      1111,
      'Zaunergasse',
      'test@gmail.com',
      'pw1',
      999,
      false,
      false
      )]
      )
    ]
  }

  getAll() {
    return this.vaccinations;
  }

  getSingle(key : string) : Vaccination {
    return this.vaccinations.find(vaccination => vaccination.key === key);
  }
}
