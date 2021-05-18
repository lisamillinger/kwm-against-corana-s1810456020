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
    let id = Number.parseInt(sessionStorage.getItem('userId'));
    this.getProfil(id);
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

  getProfil(id: number) {
    this.app.getSinglePersonbyID(id).subscribe(res => (this.person = res));
  }

  /*alreadyRegistred(sv: string): boolean {
    for (let i = 0; i < this.vaccination.people.length; i++) {
      if (this.vaccination.people[i].sv_number == sv) {
        //person already registerd
        return false;
      } else {
        //person can still be registred
        return true;
      }
    }
  }*/

  register(key: string) {
    console.log(key);
    console.log(this.person.isRegistred);
    let sv = this.person.sv_number;

    if (
      this.vaccination.current_registrations ==
        this.vaccination.max_registrations ||
      this.person.isRegistred == true
    ) {
      alert('Keine Anmeldung mehr möglich');
    } else {
      this.app.registerPerson(sv, this.vaccination).subscribe();
      console.log(this.vaccination);
      alert('Sie wurden zur Impfung ' + this.vaccination.key + ' angemeldet');
    }
  }

  //current registred people
  countPeople(): number {
    let x = this.vaccination.people.length;

    return x;
  }
}
