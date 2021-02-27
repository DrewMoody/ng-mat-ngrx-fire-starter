import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppState } from 'src/app/models/state';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('inOutLoader', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
    trigger('inOutLogin', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms 300ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class LoginComponent {
  readonly user$: Observable<User | 'undefined' | 'null'>;

  constructor(private store: Store<AppState>, private auth: AngularFireAuth) {
    this.user$ = this.store
      .select('user')
      .pipe(
        map((user) =>
          user === undefined ? 'undefined' : user === null ? 'null' : user
        )
      );
  }

  onGoogleSignIn() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  onSignOut() {
    this.auth.signOut();
  }
}
