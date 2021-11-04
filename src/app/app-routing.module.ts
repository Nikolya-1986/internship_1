import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterCardComponent } from './components/character-card/character-card.component';

const routes: Routes = [
  {
    path: "", loadChildren: () => import("./modules/home-character-card/home-character-card.module").then(module => module.HomeCharacterCardModule)
  },
  {
    path: "discription", loadChildren: () => import("./modules/description-character-card/description-character-card.module").then(module => module.DiscriptionCharacterCardModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
