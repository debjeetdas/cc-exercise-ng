import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @HostBinding('class') wrapperClass = 'flex-auto component-padding';
  constructor(
    private activatedRoute: ActivatedRoute,
    private ss: SharedService,
    private router: Router
  ) { }

  ngOnInit() {}

}
