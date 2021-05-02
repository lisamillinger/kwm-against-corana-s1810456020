import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { VaccinationDetailsComponent } from "./vaccination-details/vaccination-details.component";
import { VaccinationListComponent } from "./vaccination-list/vaccination-list.component";
import { HomeComponent } from "./home/home.component";
import { VaccinationFormComponent } from "./vaccination-form/vaccination-form.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "vaccinations", component: VaccinationListComponent },
  { path: "vaccinations/:key", component: VaccinationDetailsComponent },
  { path: "admin", component: VaccinationFormComponent },
  { path: "admin/:key", component: VaccinationFormComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
