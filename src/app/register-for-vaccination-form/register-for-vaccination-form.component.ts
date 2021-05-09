import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl
} from '@angular/forms';
import { VaccinationFactory } from '../shared/vaccination-factory';
import { Vaccination, People } from '../shared/vaccination';
import { VaccinationStoreService } from '../shared/vaccination-store.service';

@Component({
  selector: 'app-register-for-vaccination-form',
  templateUrl: './register-for-vaccination-form.component.html',
  styleUrls: ['./register-for-vaccination-form.component.css']
})
export class RegisterForVaccinationFormComponent implements OnInit {
  registerForm: FormGroup;
  vaccinations: FormArray;
  errors: { [key: string]: string } = {};

  constructor(
    private fb: FormBuilder,
    private app: VaccinationStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  initRegistration() {}

  buildVaccinations() {}

  submitForm() {}
}
