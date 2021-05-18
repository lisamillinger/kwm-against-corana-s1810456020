import { People } from "./people";


export class PeopleFactory {
  static empty(): People {
    return new People(
      0,
      "",
      "",
      new Date(),
      "",
      "",
      "",
      "",
      "",
      0,
      false,
      false,
      false,
    )
  }

  static fromObject(rawPerson: any): People {
    return new People(
      rawPerson.id,
      rawPerson.firstName,
      rawPerson.lastName,
      typeof rawPerson.birthday === "string"
        ? new Date(rawPerson.birthday)
        : rawPerson.birthday,
      rawPerson.gender,
      rawPerson.sv_number,
      rawPerson.address,
      rawPerson.email,
      rawPerson.password,
      rawPerson.telephone_number,
      rawPerson.isRegistred,
      rawPerson.isVaccinated,
      rawPerson.isAdmin
    );
  }
}