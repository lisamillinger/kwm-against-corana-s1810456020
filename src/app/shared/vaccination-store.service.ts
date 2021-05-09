import { Injectable } from '@angular/core';
import { Vaccination, People, Location } from './vaccination';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class VaccinationStoreService {
  private api = 'https://corana21.s1810456020.student.kwmhgb.at/api';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Array<Vaccination>> {
    return this.http
      .get(`${this.api}/vaccinations`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getAllPeople(): Observable<Array<People>> {
    return this.http
      .get(`${this.api}/registrations`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getVaccinationForPerson(): Observable<Vaccination> {
    return this.http
      .get(`${this.api}/registrations/{$id}/vaccination`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  vaccinatePerson(person: People): Observable<any> {
    return this.http
      .put(`${this.api}/registration/${person.sv_number}`, person)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getSingle(key: string): Observable<Vaccination> {
    return this.http
      .get<Vaccination>(`${this.api}/vaccinations/${key}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getSinglePerson(sv_number: string): Observable<People> {
    return this.http
      .get<Vaccination>(`${this.api}/registrations/${sv_number}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getSinglePersonbyID(id): Observable<People> {
    return this.http
      .get<Vaccination>(`${this.api}/registrations/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  create(vaccination: Vaccination): Observable<any> {
    return this.http
      .post(`${this.api}/vaccination`, vaccination)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  update(vaccination: Vaccination): Observable<any> {
    return this.http
      .put(`${this.api}/vaccination/${vaccination.key}`, vaccination)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  updateNeu(vaccination: Vaccination): Observable<any> {
    return this.http
      .put(`${this.api}/vaccination/${vaccination.id}`, vaccination)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  remove(key: string): Observable<any> {
    return this.http
      .delete(`${this.api}/vaccination/${key}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }

  check(key: string): Observable<Boolean> {
    return this.http
      .get<Boolean>(`${this.api}/vaccinations/checkkey/${key}`)
      .pipe(catchError(this.errorHandler));
  }

  /*vaccinations: Vaccination[];
  constructor() {
    this.vaccinations = [
      new Vaccination(
        1,
        "IMPFUNG887",
        "some information",
        new Date(2021 - 22 - 8),
        88,
        77,
        false,
        [new Location(1, 5020, "Zaunergasse 11", "Salzburg")],
        [
          new People(
            1,
            "Maximiliane",
            "Musterfrau",
            new Date(1999 - 1 - 1),
            "female",
            1111,
            "Zaunergasse",
            "test@gmail.com",
            "pw1",
            999,
            false,
            false
          )
        ]
      )
    ];
  }

  getAll() {
    return this.vaccinations;
  }

  getSingle(key: string): Vaccination {
    return this.vaccinations.find(vaccination => vaccination.key === key);
  }*/
}
