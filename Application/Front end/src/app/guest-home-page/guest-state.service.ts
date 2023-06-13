import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GuestStateService {
  disableGuard: boolean = false;

  constructor() { }
}
