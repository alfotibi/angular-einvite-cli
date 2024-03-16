import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'animated-arrow',
  styles: [`
    .arrows-container {
      border: none;
      display: flex;
      position: relative;
      background: none;
    }
    .arrows-container:focus {
      outline: 0;
      background: none;
      box-shadow: none;
    }
    .arrows-container:hover {
      background: none;
      cursor: pointer;
    }
    .arrows-container .arrow {
      box-shadow: 2px 2px 0 0 lightseagreen inset;
      padding: 12px;
      opacity: 0;
      position: absolute;
    }
    .arrows-container .arrow.right {
      
      transform: rotate(135deg);
    }
    .arrows-container .arrow.left {
      transform: rotate(-45deg)
    }
    .arrows-container .arrow-one.right {
      animation: arrow-movement-right 2s ease-in-out infinite;
    }
    .arrows-container .arrow-two.right {
      animation: arrow-movement-right 2s 1s ease-in-out infinite;
    }
    .arrows-container .arrow-one.left {
      animation: arrow-movement-left 2s ease-in-out infinite;
    }
    .arrows-container .arrow-two.left {
      animation: arrow-movement-left 2s 1s ease-in-out infinite;
    }
    @keyframes arrow-movement-right {
      0% {
        opacity: 0;
        left: 0;
      }
      70% {
        opacity: 1;
      }
      100% {
        opacity: 0;
        left: 30px;
      }
    }
    @keyframes arrow-movement-left {
      0% {
        opacity: 0;
        right: 0;
      }
      70% {
        opacity: 1;
      }
      100% {
        opacity: 0;
        right: 30px;
      }
    }
  `],
  template: `
    <button class="arrows-container" (click)="handleClick.emit()">
      <div [ngClass]="'arrow arrow-one ' + direction">
      </div>
      <div [ngClass]="'arrow arrow-two ' + direction">
      </div>
    </button>
  `
})
export class AnimatedArrowComponent {
  @Input()
  direction = '';
  @Output('onClick')
  handleClick = new EventEmitter;
}
