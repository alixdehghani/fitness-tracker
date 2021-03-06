import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopCurrentTrainingComponent } from './stop-current-training/stop-current-training.component';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-current-trainig',
  templateUrl: './current-trainig.component.html',
  styleUrls: ['./current-trainig.component.css']
})
export class CurrentTrainigComponent implements OnInit, OnDestroy {
  @Output() onGoingExit = new EventEmitter();
  progress = 0;
  timer = 0;
  stoptrSubscription: Subscription;
  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit() {
    this.onCounterProgress();
  }
  onCounterProgress() {
    const step = this.trainingService.getCurrentexercise().duration/100 *1000;
    this.timer = setInterval(() => {
      this.progress = this.progress + 10;
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
  }
  onStop() {
    clearInterval(this.timer);
    const stoptr = this.dialog.open(StopCurrentTrainingComponent, { data: { progress: this.progress } });
    this.stoptrSubscription = stoptr.afterClosed().subscribe((resualt) => {
      if (resualt) {
        this.trainingService.canceledExercise(this.progress);
      }
      else {
        this.onCounterProgress();
      }
    })
  }
  ngOnDestroy(){
    if(this.stoptrSubscription){
      this.stoptrSubscription.unsubscribe();
    }
  }
}
