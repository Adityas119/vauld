import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { Task } from './../../_models';

@Injectable({
  providedIn: 'root'
})
export class GlobalEventifireService {

  constructor() { }

  protected readonly userTasksList =  JSON.parse(localStorage.getItem('taskList'));
  private userData = new BehaviorSubject<any>(this.userTasksList);
  $usersTaskDetails = this.userData.asObservable();
}
