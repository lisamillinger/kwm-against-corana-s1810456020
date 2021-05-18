import { Vaccination } from "./vaccination";

export class VaccinationFactory {
  static empty(): Vaccination {
    return new Vaccination(
      null,
      "",
      "",
      new Date(),
      0,
      0,
      false,
      [{ id: 0, post_code: 0, address: "", city: "" }],
      [
        {
          id: 0,
          firstName: "",
          lastName: "",
          birthday: new Date(),
          gender: "",
          sv_number: "",
          address: "",
          email: "",
          password: "",
          telephone_number: 0,
          isRegistred: false,
          isVaccinated: false,
          isAdmin: false
        }
      ]
    );
  }

  static fromObject(rawVaccination: any): Vaccination {
    return new Vaccination(
      rawVaccination.id,
      rawVaccination.key,
      rawVaccination.information,
      typeof rawVaccination.date === "string"
        ? new Date(rawVaccination.date)
        : rawVaccination.date,
      rawVaccination.max_participants,
      rawVaccination.current_registrations,
      rawVaccination.isFull,
      rawVaccination.locations,
      rawVaccination.people
    );
  }
}
