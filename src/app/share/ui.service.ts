import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class UiService {
  loadingSpining = new Subject<boolean>();
  constructor( ) { }
}
