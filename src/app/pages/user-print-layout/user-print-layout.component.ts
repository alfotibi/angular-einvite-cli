import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-print-layout',
  // templateUrl: './user-print-layout.component.html',
  template: `
    <div class="printable-content">
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './user-print-layout.component.scss'
})
export class UserPrintLayoutComponent {
  @Input() content!: string;
}
