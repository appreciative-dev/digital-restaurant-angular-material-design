import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-appinfo',
  templateUrl: './appinfo.component.html',
  styleUrls: ['./appinfo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppinfoComponent {
  firstImg = '/assets/pwa/1.png'
  secondImg = '/assets/pwa/2.png'
  thirdImg = '/assets/pwa/3.png'
  forthImg = '/assets/pwa/4.png'
  fifthImg = '/assets/pwa/5.png'
}
