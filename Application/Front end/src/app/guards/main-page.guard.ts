import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileService } from '../main-page/profile/profile.service';

@Injectable({
  providedIn: 'root',
})
export class MainPageGuard implements CanActivate, CanActivateChild {
  private disableGuard: boolean = false;

  constructor(private profileService: ProfileService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.disableGuard) {
      return true;
    }

    if (this.profileService.isDefined) {
      return true;
    } else {
      this.router.navigate(['/signInUser']);
      return false;
    }
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.disableGuard) {
      return true;
    }

    if (this.profileService.isDefined) {
      return true;
    } else {
      this.router.navigate(['/signInUser']);
      return false;
    }
  }

  setGuardStatus(disable: boolean): void {
    this.disableGuard = disable;
  }
}
