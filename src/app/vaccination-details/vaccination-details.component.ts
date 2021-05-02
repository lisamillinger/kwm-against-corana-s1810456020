import { Component, OnInit, Input } from '@angular/core';
import { Vaccination } from '../shared/vaccination';

@Component({
  selector: 'app-vaccination-details',
  templateUrl: './vaccination-details.component.html',
  styleUrls: ['./vaccination-details.component.css']
})
export class VaccinationDetailsComponent implements OnInit {
  @Input() vaccination: Vaccination

  constructor() { }

  ngOnInit() {
  }

}