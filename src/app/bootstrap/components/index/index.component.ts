import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import * as moment from 'moment'
import { MessageService } from 'src/app/shared/services/message.service'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent implements OnInit {
  today = moment(new Date()).locale('es').format('DD MMMM')

  myIndex = 0

  chefName = 'Ofelma'
  chefIntro = 'chefIntro'

  description = 'description'

  constructor(private router: Router, private messageService: MessageService) {}

  ngOnInit() {
    this.carousel()
    setInterval(() => {
      this.carousel()
    }, 3000)
  }

  redirectToMenu() {
    // this.router.navigateByUrl("/domicilios").then((res) => {
    //   let nameAndTime = "Menú del Día " + this.today
    //   this.messageService.setNavbarTitle(nameAndTime)
    // })
  }

  carousel() {
    var i
    var x = document.getElementsByClassName('mySlides') as HTMLCollectionOf<any>
    if (x.length > 0) {
      for (i = 0; i < x.length; i++) {
        x[i].style.display = 'none'
      }
      this.myIndex++
      if (this.myIndex > x.length) {
        this.myIndex = 1
      }
      x[this.myIndex - 1].style.display = 'block'
    }
  }
}
