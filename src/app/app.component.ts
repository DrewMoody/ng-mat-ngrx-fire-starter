import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from './models/state';
import { User } from './models/user';
import { signOut } from './store/actions/user';

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
  readonly user$: Observable<User | null>;

  constructor(
    private router: Router,
    breakpointObserver: BreakpointObserver,
    private store: Store<AppState>
  ) {
    this.isSmallScreen$ = breakpointObserver
      .observe([Breakpoints.XSmall])
      .pipe(map(({ matches }) => matches));

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

  onSignOut() {
    this.store.dispatch(signOut());
  }
}
