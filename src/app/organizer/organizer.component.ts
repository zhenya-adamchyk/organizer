import {Component, OnInit} from '@angular/core';
import {DateService} from '../shared/date.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Task, TasksService} from '../shared/tasks.service';
import {switchMap} from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  form: FormGroup
  tasks: Task[] = []

  constructor(readonly dateService: DateService, readonly tasksService: TasksService) { }

  ngOnInit() {
    this.dateService.date
      .pipe(switchMap(value => this.tasksService.load(value)))
      .subscribe(tasks => {
      this.tasks = tasks
      this.tasks.sort((a, b) => a.time.localeCompare(b.time))
    })

    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      repeatTask: new FormControl(1),
    })
  }

  submit() {
    const { title, time, repeatTask } = this.form.value
    let date = this.dateService.date.value
    const tasksArr = Array.from({length: repeatTask + 1}).map((e, i) => date.clone().add(i, 'year'))
    

    forkJoin(tasksArr.map((d) => {
      const task: Task = { time, title, date: d.format('DD-MM-YYYY') }
      return this.tasksService.create(task)
    }))
    .subscribe(task => {
      this.tasks.push(task[0])
      this.tasks.sort((a, b) => a.time.localeCompare(b.time))
      this.form.reset()
      this.dateService.date.next(this.dateService.date.value)
    })
  }

  remove(task: Task) {
    this.tasksService.remove(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id)
      this.dateService.date.next(this.dateService.date.value)
    })
  }

}
