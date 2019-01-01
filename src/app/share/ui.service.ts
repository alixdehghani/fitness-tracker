import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class UiService {
  loadingSpining = new Subject<boolean>();
  constructor(private snackBar: MatSnackBar) { }
  openSnackbar(message,action,durition){
    this.snackBar.open(message, null, {
      duration: durition,
    });
  }
}
