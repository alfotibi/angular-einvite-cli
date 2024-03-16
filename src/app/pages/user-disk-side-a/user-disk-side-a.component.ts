import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-disk-side-a',
  templateUrl: './user-disk-side-a.component.html',
  styleUrl: './user-disk-side-a.component.scss'
})
export class UserDiskSideAComponent implements OnInit {
  diskSideA: any = "../../../assets/img/TOT-SIDE1.png"

  ngOnInit() {}
}
