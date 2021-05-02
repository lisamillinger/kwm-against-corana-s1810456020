import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators, FormControl
} from "@angular/forms";
import {VaccinationFactory } from "../shared/vaccination-factory";
import { VaccinationStoreService } from "../shared/vaccination-store.service";
import { Vaccination, Location } from "../shared/vaccination";

@Component({
  selector: 'app-vaccination-form',
  templateUrl: './vaccination-form.component.html',
  styleUrls: ['./vaccination-form.component.css']
})
export class VaccinationFormComponent implements OnInit {
  vaccinationForm: FormGroup;
  vaccination = VaccinationFactory.empty();
  errors: { [key: string]: string} = {};
  isUpdatingVaccination = false;
  locations: FormArray;

  constructor(
    private fb: FormBuilder,
    private app: VaccinationStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const key = this.route.snapshot.params["key"];
    if(key) {
      this.isUpdatingVaccination = true;
      this.app.getSingle(key).subscribe(vaccination => {this.vaccination = vaccination; this.initVaccination();
      });
    }
    this.initVaccination();
  }

  initVaccination() {
    this.vaccinationForm = this.fb.group({
      
    })

  }

  submitForm() {

  }

}