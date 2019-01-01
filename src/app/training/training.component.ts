import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from './training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  currectSubscription: Subscription;
  hasCorrent = false;
  constructor(private trainigService: TrainingService) { }

  ngOnInit() {
    this.currectSubscription = this.trainigService.exerciseChanged.subscribe(ex => {
      if (ex) {
        this.hasCorrent = true;
      } else {
        this.hasCorrent = false;
      }
    })
  }
  ngOnDestroy() {
    if (this.currectSubscription) {
      this.currectSubscription.unsubscribe();
    }
  }

}
