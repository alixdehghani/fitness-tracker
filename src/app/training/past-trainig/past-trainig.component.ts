import { Exercise } from './../exercise.model';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-trainig',
  templateUrl: './past-trainig.component.html',
  styleUrls: ['./past-trainig.component.css']
})
export class PastTrainigComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date','name','duration','calories','state'];
  dataSource = new MatTableDataSource<Exercise>();
  constructor(private trainingService: TrainingService) { }
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.dataSource.data= this.trainingService.getCompletedOrCanceledExcercised();
  }
  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }

}
