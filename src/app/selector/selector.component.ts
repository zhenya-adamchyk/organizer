import { Component } from '@angular/core';
import {DateService} from '../shared/date.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent {

  constructor(readonly dateService: DateService) { }

  go(dir: number) {
    this.dateService.changeMonth(dir)
  }

  setNow() {
    this.dateService.setNow()
  }

}
