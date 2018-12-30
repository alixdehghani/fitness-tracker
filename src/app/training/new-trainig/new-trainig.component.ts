import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-trainig',
  templateUrl: './new-trainig.component.html',
  styleUrls: ['./new-trainig.component.css']
})
export class NewTrainigComponent implements OnInit {
  @Output() startPress = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  goToCurrentTraining() {
    this.startPress.emit();
  }
}
