import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth-guard';

const routes: Routes = [
  {
    path: "home", loadChildren: () => import("./modules/home/home.module").then(module => module.HomeModule), canActivate: [AuthGuard]
  },
  {
    path: "description/:id", loadChildren: () => import("./modules/description/description.module").then(module => module.DescriptionCharacterCardModule), canActivate: [AuthGuard]
  },
  {
    path: "login", loadChildren: () => import("./modules/login/login.module").then(module => module.LoginModule)
  },
  {
    path: "add", loadChildren: () => import("./modules/add-character/add-character.module").then(module => module.AddCharacterModule), canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
