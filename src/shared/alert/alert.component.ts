import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() alertMessage!: string;
  @Output() close = new Subject<void>();

  constructor() {}

  ngOnInit() {}

  onClose() {
    this.close.next();
  }
}
