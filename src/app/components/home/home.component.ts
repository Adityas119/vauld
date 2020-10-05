import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ConstantsService, GlobalEventifireService } from './../../_services';
import { Task } from './../../_models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public addTaskFormGroup: FormGroup;
  public tasksList: Array<Task> = [];

  constructor(private _constantServce: ConstantsService, private _globalEventifire: GlobalEventifireService) { }

  ngOnInit(): void {
    this._globalEventifire.$usersTaskDetails.subscribe((res: Array<Task>) => {
      if (res) {
        this.tasksList = res;
      }
    })
    this.initializeTaskFrom();
  }

  initializeTaskFrom() {
    this.addTaskFormGroup = new FormGroup({
      task: new FormControl(null, [Validators.required, Validators.pattern(this._constantServce.ALPHA_NUMERIC)])
    });
  }

  addTask() {
    if (this.addTaskFormGroup.valid) {
      let tempTaskObj = new Task();
      tempTaskObj.task_name = this.addTaskFormGroup.controls.task.value;
      tempTaskObj.is_deleted = false;
      tempTaskObj.is_completed = false;
      this.tasksList.push(tempTaskObj);
      this.saveTaskInLocalStorageAndClearField(this.tasksList);
    }
  }

  saveTaskInLocalStorageAndClearField(data) {
    localStorage.setItem('taskList', JSON.stringify(data));
    this.addTaskFormGroup.setValue({
      task: null
    });
    this.addTaskFormGroup.reset(this.addTaskFormGroup.value);
  }

  deleteTask(ele) {
    this.tasksList.splice(ele, 1);
    this.saveTaskInLocalStorageAndClearField(this.tasksList);
  }

  markAsDone(value) {
    this.tasksList[value].is_completed = !this.tasksList[value].is_completed;
    this.saveTaskInLocalStorageAndClearField(this.tasksList);
  }

  editTask(index) {
    this.addTaskFormGroup.setValue({
      task: this.tasksList[index].task_name
    });
    this.tasksList.splice(index, 1);
  }

  reorderTaskList(data){
    localStorage.setItem('taskList', JSON.stringify(data));
  }

}
