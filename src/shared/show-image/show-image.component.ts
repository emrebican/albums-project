import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.scss']
})
export class ShowImageComponent implements OnInit {
  @Input() imageUrl!: string;
  @Output() close = new Subject<void>();
  closeIcon = faTimesCircle;

  constructor() {}

  ngOnInit() {}

  onClose() {
    this.close.next();
  }
}
