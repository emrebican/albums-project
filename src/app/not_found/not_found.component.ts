import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-not_found',
  templateUrl: './not_found.component.html',
  styleUrls: ['./not_found.component.scss']
})
export class NotFoundComponent implements OnInit {
  message!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // this.message = this.route.snapshot.data['message'];

    this.route.data.subscribe((data: Data) => {
      this.message = data['message'];
    });
  }
}
