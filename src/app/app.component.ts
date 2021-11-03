import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Character } from './model/app.model';
import { AppService } from './services/app.service';
import *as usersActions from './store/app.actions';
import * as usersSelector from './store/app.selector';
import AppUsersState from './store/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{

  loading$!: Observable<string | any>
  users$!: Observable<Character[]>
  error$!: Observable<Error[]>

  constructor(
    private store: Store<AppUsersState>,
    private usersServicce: AppService
  ){}

  ngOnInit(): void {
    // this.users$ = this.usersServicce.getCharacters();
      
    this.store.dispatch(usersActions.loadUsersRequest())
    // this.loading$ = this.store.pipe(select(usersSelector.getUsersLoadingSelector))
    this.users$ = this.store.pipe(select(usersSelector.getUsersListSelector))
    // this.error$ = this.store.pipe(select(usersSelector.getUsersFailSelector))
  }
}
