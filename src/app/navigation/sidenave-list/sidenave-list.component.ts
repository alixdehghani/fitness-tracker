import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenave-list',
  templateUrl: './sidenave-list.component.html',
  styleUrls: ['./sidenave-list.component.css']
})
export class SidenaveListComponent implements OnInit {
  @Output() closeSadenave = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  toCloseSidenave(){
    this.closeSadenave.emit()
  }

}
