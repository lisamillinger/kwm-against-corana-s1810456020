import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl
} from "@angular/forms";
import { VaccinationFactory } from "../shared/vaccination-factory";
import { VaccinationStoreService } from "../shared/vaccination-store.service";
import { Vaccination, Location } from "../shared/vaccination";

@Component({
  selector: "app-vaccination-form",
  templateUrl: "./vaccination-form.component.html",
  styleUrls: ["./vaccination-form.component.css"]
})
export class VaccinationFormComponent implements OnInit {
  vaccinationForm: FormGroup;
  vaccination = VaccinationFactory.empty();
  errors: { [key: string]: string } = {};
  isUpdatingVaccination = false;
  locations: FormArray;

  constructor(
    private fb: FormBuilder,
    private app: VaccinationStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const key = this.route.snapshot.params["key"];
    if (key) {
      this.isUpdatingVaccination = true;
      this.app.getSingle(key).subscribe(vaccination => {
        this.vaccination = vaccination;
        this.initVaccination();
      });
    }
    this.initVaccination();
  }

  initVaccination() {
    this.vaccinationForm = this.fb.group({
      id: this.vaccination.id,
      key: [this.vaccination.key, Validators.required],
      date: [this.vaccination.date],
      information: [this.vaccination.information],
      max_participants: [
        this.vaccination.max_participants,
        [Validators.min(1), Validators.max(100)]
      ],
      isFull: [this.vaccination.isFull],
      locations: this.locations
    });
    this.vaccinationForm.statusChanges.subscribe(() =>
      this.updateErrorMessages()
    );
  }

  updateErrorMessages() {
    console.log("is invalid? " + this.vaccinationForm.invalid);
    this.errors = {};
  }

  submitForm() {
    const vaccination: Vaccination = VaccinationFactory.fromObject(
      this.vaccinationForm.value
    );
    vaccination.locations = this.vaccinationForm.value.locations;
    console.log(vaccination);

    //copy People
    vaccination.people = this.vaccination.people;

    if (this.isUpdatingVaccination) {
      this.app.update(vaccination).subscribe(res => {
        this.router.navigate(["../../vaccinations", vaccination.key], {
          relativeTo: this.route
        });
      });
    } else {
      this.app.create(vaccination).subscribe(res => {
        this.vaccination = VaccinationFactory.empty();
        this.vaccinationForm.reset(VaccinationFactory.empty());
        this.router.navigate(["../vaccinations"], { relativeTo: this.route });
      });
    }
  }
}
