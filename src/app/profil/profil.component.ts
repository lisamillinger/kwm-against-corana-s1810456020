import { Component, OnInit, Input } from '@angular/core';
import { People } from '../shared/people';
import { VaccinationStoreService } from '../shared/vaccination-store.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  @Input() person: People;

  constructor(private app: VaccinationStoreService) {}

  ngOnInit() {
    this.getProfil(3);
  }

  getProfil(id) {
    this.app.getSinglePersonbyID(id).subscribe(res => (this.person = res));
    console.log(this.person);
  }
}
