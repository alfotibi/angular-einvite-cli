import { Component } from '@angular/core';
import { ChildrenOutletContexts, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title: string = '';
  constructor(private _context: ChildrenOutletContexts) {}

  getRouteAnimationData() {
    return this._context.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
