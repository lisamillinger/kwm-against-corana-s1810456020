import { Component, OnInit, Input, Output } from '@angular/core';
import { Vaccination } from '../shared/vaccination';
import { People } from '../shared/people';
import { VaccinationStoreService } from '../shared/vaccination-store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VaccinationFactory } from '../shared/vaccination-factory';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'app-vaccination-details',
  templateUrl: './vaccination-details.component.html',
  styleUrls: ['./vaccination-details.component.css']
})
export class VaccinationDetailsComponent implements OnInit {
  vaccination: Vaccination = VaccinationFactory.empty();
  person: People;

  constructor(
    private app: VaccinationStoreService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthenticationService
  ) {}

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.app.getSingle(params['key']).subscribe(v => (this.vaccination = v));
    this.getProfil(19);
  }

  removeVaccination() {
    if (confirm('Impfung wirklich löschen?')) {
      this.app
        .remove(this.vaccination.key)
        .subscribe(res =>
          this.router.navigate(['../'], { relativeTo: this.route })
        );
    }
  }

  getmax_participants(num: number) {
    return new Array(num);
  }

  getProfil(id) {
    this.app.getSinglePersonbyID(id).subscribe(res => (this.person = res));
  }

  alreadyRegistred(sv: string): boolean {
    for (let per of this.vaccination.people) {
      console.log(per.sv_number);
      console.log(sv);
      if (per.sv_number == sv) {
        return true;
      } else {
        //noch nicht angemeldet
        return false;
      }
    }
  }

  register(key: string) {
    console.log(key);
    let sv = this.person.sv_number;
    let isRegistred = this.alreadyRegistred(sv);
    console.log(isRegistred);

    if (this.alreadyRegistred(sv) == true) {
      
    } else {
      this.app.registerPerson(sv, this.vaccination).subscribe();
      console.log(this.vaccination);
    }
  }

  //current registred people
  countPeople(): number {
    let x = this.vaccination.people.length;
    console.log(x);

    return x;
  }
}
