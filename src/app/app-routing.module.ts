import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "", loadChildren: () => import("./modules/home/home.module").then(module => module.HomeModule)
  },
  {
    path: "description", loadChildren: () => import("./modules/description-character-card/description-character-card.module").then(module => module.DescriptionCharacterCardModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
