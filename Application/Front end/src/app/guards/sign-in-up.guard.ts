import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileService } from '../main-page/profile/profile.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class SignInUpGuard implements CanActivate {
  private disableGuard: boolean = false;

  constructor(private router: Router, private profileService: ProfileService) { }

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
      this.router.navigate(['/mainPage/homePage']);
      return false;
    } else {
      return true;
    }
  }

  setGuardStatus(disable: boolean): void {
    this.disableGuard = disable;
  }
}
