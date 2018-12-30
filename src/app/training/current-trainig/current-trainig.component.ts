import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopCurrentTrainingComponent } from './stop-current-training/stop-current-training.component';

@Component({
  selector: 'app-current-trainig',
  templateUrl: './current-trainig.component.html',
  styleUrls: ['./current-trainig.component.css']
})
export class CurrentTrainigComponent implements OnInit {
  @Output() onGoingExit = new EventEmitter();
  progress = 0;
  timer = 0;
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.onCounterProgress();
  }
  onCounterProgress() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 20;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }
  onStop() {
    clearInterval(this.timer);
    const stoptr = this.dialog.open(StopCurrentTrainingComponent, { data: { progress: this.progress } });
    stoptr.afterClosed().subscribe((resualt) => {
      if (resualt) {
        this.onGoingExit.emit()
      }
      else {
        this.onCounterProgress();
      }
    })
  }
}
