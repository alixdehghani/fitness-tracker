import { Exercise } from './../exercise.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/share/ui.service';

@Component({
  selector: 'app-new-trainig',
  templateUrl: './new-trainig.component.html',
  styleUrls: ['./new-trainig.component.css']
})
export class NewTrainigComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  exerciseSubstracrion: Subscription;
  loadingSnipning = false;
  loadingSpiningSubscription: Subscription;
  constructor(private trainingService: TrainingService, private db: AngularFirestore, private uiService: UiService) { }

  ngOnInit() {
    this.loadingSpiningSubscription = this.uiService.loadingSpining.subscribe(resualt => {
      this.loadingSnipning = resualt;
    })
    this.exerciseSubstracrion = this.trainingService.exercisesChanged.subscribe(resualt => {
      this.exercises = resualt;
    })
    this.getAvailableExercise();
  }
  getAvailableExercise() {
    this.trainingService.fechgetAvailabExercise();
  }
  goToCurrentTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
  ngOnDestroy() {
    if (this.exerciseSubstracrion) {
      this.exerciseSubstracrion.unsubscribe();
    }
    if (this.loadingSpiningSubscription) {
      this.loadingSpiningSubscription.unsubscribe();
    }
  }

}
