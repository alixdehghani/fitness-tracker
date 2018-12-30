import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-stop-current-training',
  template: `<h1 mat-dialog-title>Are you sure?</h1>
            <mat-dialog-content>
              <p>you already got {{passed.progress}}</p>
            </mat-dialog-content>
            <mat-dialog-actions>
              <button mat-button [mat-dialog-close]="true">Yes</button>
              <button mat-button [mat-dialog-close]="false">No</button>
            </mat-dialog-actions>`
          })
export class StopCurrentTrainingComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public passed: any) { }

  ngOnInit() {
  }

}
