import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  public ALPHA_NUMERIC : RegExp;

  constructor() {
    this.ALPHA_NUMERIC = /^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/;
   }
}
