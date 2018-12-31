import { Exercise } from './../exercise.model';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-trainig',
  templateUrl: './past-trainig.component.html',
  styleUrls: ['./past-trainig.component.css']
})
export class PastTrainigComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date','name','duration','calories','state'];
  dataSource = new MatTableDataSource<Exercise>();
  private exerciseSubscription: Subscription;
  constructor(private trainingService: TrainingService) { }
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exercisesFinishChanged.subscribe((exercises: Exercise[]) => {
      this.dataSource.data = exercises;
    });
    this.trainingService.fechCompletedOrCanceledExcercised();
  }
  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  doFilter(filtering: string){
    this.dataSource.filter = filtering.trim().toLowerCase();
  }
  ngOnDestroy(){
    this.exerciseSubscription.unsubscribe();
  }

}
