import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'app-button',
  templateUrl: './app-button.component.html',
  styleUrls: ['./app-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppButtonComponent {
  @Input()
  title: string
  @Input()
  icon: string
  @Input()
  url: string
  @Input()
  disabled: boolean
  @Input()
  type: string
  @Input()
  buttonType: string = 'button'

  constructor() {}
}
