import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'

@Component({
  selector: 'app-detail-toolbar',
  templateUrl: './app-detail-toolbar.component.html',
  styleUrls: ['./app-detail-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDetailToolbarComponent {
  @Input()
  title: string
  @Input()
  url: string
  @Input()
  id: string
  @Output()
  delete = new EventEmitter()

  constructor() {}

  getEditUrl = (): string => `${this.url + '/edit/' + this.id}`
}
