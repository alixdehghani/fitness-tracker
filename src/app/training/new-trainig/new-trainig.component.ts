import { Exercise } from './../exercise.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-trainig',
  templateUrl: './new-trainig.component.html',
  styleUrls: ['./new-trainig.component.css']
})
export class NewTrainigComponent implements OnInit, OnDestroy {
  exercises : Exercise[];
  exerciseSubstracrion: Subscription;
  constructor(private trainingService: TrainingService, private db: AngularFirestore) { }

  ngOnInit() {
    this.exerciseSubstracrion = this.trainingService.exercisesChanged.subscribe(resualt => {
      this.exercises = resualt;
    })
    this.trainingService.fechgetAvailabExercise();
  }
  goToCurrentTraining(form: NgForm) {   
    this.trainingService.startExercise(form.value.exercise); 
  }
  ngOnDestroy(){
    this.exerciseSubstracrion.unsubscribe();
  }
}
