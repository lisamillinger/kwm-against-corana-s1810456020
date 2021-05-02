import { Injectable } from "@angular/core";
import { Vaccination, People, Location } from "./vaccination";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";

@Injectable()
export class VaccinationStoreService {
  private api = "https://corana21.s1810456020.student.kwmhgb.at/api";

  constructor(private http: HttpClient) {}

  getAll(): Observable<Array<Vaccination>> {
    return this.http
      .get(`${this.api}/vaccinations`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getSingle(key: string): Observable<Vaccination> {
    return this.http
      .get<Vaccination>(`${this.api}/vaccinations/${key}`)
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
  remove(key: string): Observable<any> {
    return this.http
      .delete(`${this.api}/vaccination/${key}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
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
