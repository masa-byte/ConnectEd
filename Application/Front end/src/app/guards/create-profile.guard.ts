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
export class CreateProfileGuard implements CanActivate {
  private disableGuard: boolean = false;

  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    private router: Router
  ) { }

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

  setGuardStatus(disable: boolean): void {
    this.disableGuard = disable;
  }
}
