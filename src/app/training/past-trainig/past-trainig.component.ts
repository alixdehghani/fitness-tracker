import { Exercise } from './../exercise.model';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-trainig',
  templateUrl: './past-trainig.component.html',
  styleUrls: ['./past-trainig.component.css']
})
export class PastTrainigComponent implements OnInit {
  displayedColumns = ['date','name','duration','calories','state'];
  dataSource = new MatTableDataSource<Exercise>();
  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.dataSource.data= this.trainingService.getCompletedOrCanceledExcercised();
  }

}
