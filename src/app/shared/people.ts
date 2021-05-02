export class People {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public birthday: Date,
    public gender: string,
    public sv_number: number,
    public address: string,
    public email: string,
    public password: string,
    public telephone_number: number,
    public isVaccinated: boolean,
    public isAdmin: boolean
  ) {}
}