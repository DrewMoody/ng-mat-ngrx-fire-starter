import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDrawer } from '@angular/material/sidenav';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';
import { AppState } from './models/state';
import { User } from './models/user';
import { init, signIn, signOut } from './store/actions/user';
import firebase from 'firebase/app';

interface NavLink {
  name: string;
  endpoint: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(MatDrawer) drawer: MatDrawer;
  readonly links: NavLink[] = [
    {
      name: 'Home',
      endpoint: '/',
    },
    {
      name: 'Login',
      endpoint: '/login',
    },
  ];
  readonly isSmallScreen$: Observable<boolean>;
  /** Reads userAuth from Firebase. null mapped to 'null' for usage with async pipe */
  readonly userAuth$: Observable<firebase.User | 'null'>;
  /** User observable from the store */
  readonly user$: Observable<User | null>;

  constructor(
    private router: Router,
    breakpointObserver: BreakpointObserver,
    private store: Store<AppState>,
    private auth: AngularFireAuth
  ) {
    this.isSmallScreen$ = breakpointObserver
      .observe([Breakpoints.XSmall])
      .pipe(map(({ matches }) => matches));

    /** If first user action, fire init action, else use signIn or signOut action */
    this.userAuth$ = this.auth.user.pipe(
      concatMap((user, i) =>
        i === 0
          ? of(user).pipe(tap((user) => this.store.dispatch(init({ user }))))
          : of(user).pipe(
              tap((user) => {
                if (user != null) {
                  this.store.dispatch(signIn({ user }));
                } else {
                  this.store.dispatch(signOut());
                }
              })
            )
      ),
      map((user) => (user == null ? 'null' : user))
    );

    this.user$ = this.store.select('user');
  }

  route(endpoint: string): void {
    this.router.navigateByUrl(endpoint.slice(1));
  }

  toggleSidenav() {
    this.drawer.toggle();
  }

  onSignIn() {
    this.router.navigateByUrl('login');
  }

  onSignInGoogle() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  onSignOut() {
    this.auth.signOut();
  }
}
