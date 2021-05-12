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
    console.log(this.vaccination.people);
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

  /*getParticipants() {
    return this.vaccination.people.length;
  }*/

  getProfil(id) {
    this.app.getSinglePersonbyID(id).subscribe(res => (this.person = res));
  }

  register() {
    console.log('hello');
    console.log(this.person);
    let sv = this.person.sv_number;
    this.app.registerPerson(sv, this.vaccination).subscribe();
    console.log(this.vaccination);
  }
}
