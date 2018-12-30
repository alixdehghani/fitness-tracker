import { Exercise } from './../exercise.model';
import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-trainig',
  templateUrl: './new-trainig.component.html',
  styleUrls: ['./new-trainig.component.css']
})
export class NewTrainigComponent implements OnInit {
  exercises : Exercise[];
  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exercises = this.trainingService.getAvailabExercise();
  }
  goToCurrentTraining(form: NgForm) {   
    this.trainingService.startExercise(form.value.exercise); 
  }
}
