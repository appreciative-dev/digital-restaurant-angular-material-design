import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core'
import {
  zoomOutUpOnLeaveAnimation,
  expandOnEnterAnimation,
  collapseOnLeaveAnimation,
  fadeInUpOnEnterAnimation,
} from 'angular-animations'

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
  animations: [
    zoomOutUpOnLeaveAnimation(),
    expandOnEnterAnimation(),
    collapseOnLeaveAnimation(),
    fadeInUpOnEnterAnimation(),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablesComponent implements OnInit {
  @Output()
  updateTable: EventEmitter<number> = new EventEmitter<number>()

  FREE_TABLE_COLOR = '1px solid #777'
  CHOSEN_TABLE_COLOR = '3px solid sandybrown'

  chosenTable: number = null
  orderType: string
  waiter: any
  hasNoTableError: boolean
  orderId: string

  tableTakeout

  roomSala
  roomTerraza
  roomBarra

  isRoomSala: boolean
  isRoomTerraza: boolean
  isRoomBarra: boolean

  salaTables = {
    sala_1: null,
    sala_2: null,
    sala_3: null,
    sala_4: null,
    sala_5: null,
    sala_6: null,
    sala_7: null,
    sala_8: null,
    sala_9: null,
  }

  terrazaTables = {
    terraza_10: null,
    terraza_11: null,
    terraza_12: null,
    terraza_13: null,
    terraza_14: null,
  }

  barraTables = {
    barra_15: null,
    barra_16: null,
    barra_17: null,
    barra_18: null,
    barra_19: null,
    barra_20: null,
  }

  constructor() {}

  ngOnInit() {}

  chooseRoom(room) {
    switch (room) {
      case 'Sala':
        this.isRoomSala = true
        this.isRoomTerraza = false
        this.isRoomBarra = false
        this.tableTakeout = this.FREE_TABLE_COLOR
        break
      case 'Terraza':
        this.isRoomSala = false
        this.isRoomTerraza = true
        this.isRoomBarra = false
        this.tableTakeout = this.FREE_TABLE_COLOR
        break
      case 'Barra':
        this.isRoomSala = false
        this.isRoomTerraza = false
        this.isRoomBarra = true
        this.tableTakeout = this.FREE_TABLE_COLOR
        break
    }
  }

  chooseTable(number) {
    this.updateTable.emit(number)
    switch (number) {
      case 0:
        this.tableTakeout = this.CHOSEN_TABLE_COLOR
        for (var key in this.salaTables) {
          this.salaTables[key] = this.FREE_TABLE_COLOR
        }
        this.isRoomSala = false
        this.isRoomTerraza = false
        this.isRoomBarra = false
        break
      case 1:
        this.salaTables.sala_1 = this.CHOSEN_TABLE_COLOR
        for (var key in this.salaTables) {
          if (key !== 'sala_1') {
            this.salaTables[key] = this.FREE_TABLE_COLOR
          }
        }
        break
      case 2:
        this.salaTables.sala_2 = this.CHOSEN_TABLE_COLOR
        for (var key in this.salaTables) {
          if (key !== 'sala_2') {
            this.salaTables[key] = this.FREE_TABLE_COLOR
          }
        }
        break
      case 3:
        this.salaTables.sala_3 = this.CHOSEN_TABLE_COLOR
        for (var key in this.salaTables) {
          if (key !== 'sala_3') {
            this.salaTables[key] = this.FREE_TABLE_COLOR
          }
        }
        break
      case 4:
        this.salaTables.sala_4 = this.CHOSEN_TABLE_COLOR
        for (var key in this.salaTables) {
          if (key !== 'sala_4') {
            this.salaTables[key] = this.FREE_TABLE_COLOR
          }
        }
        break
      case 5:
        this.salaTables.sala_5 = this.CHOSEN_TABLE_COLOR
        for (var key in this.salaTables) {
          if (key !== 'sala_5') {
            this.salaTables[key] = this.FREE_TABLE_COLOR
          }
        }
        break
      case 6:
        this.salaTables.sala_6 = this.CHOSEN_TABLE_COLOR
        for (var key in this.salaTables) {
          if (key !== 'sala_6') {
            this.salaTables[key] = this.FREE_TABLE_COLOR
          }
        }
        break
      case 7:
        this.salaTables.sala_7 = this.CHOSEN_TABLE_COLOR
        for (var key in this.salaTables) {
          if (key !== 'sala_7') {
            this.salaTables[key] = this.FREE_TABLE_COLOR
          }
        }
        break
      case 8:
        this.salaTables.sala_8 = this.CHOSEN_TABLE_COLOR
        for (var key in this.salaTables) {
          if (key !== 'sala_8') {
            this.salaTables[key] = this.FREE_TABLE_COLOR
          }
        }
        break
      case 9:
        this.salaTables.sala_9 = this.CHOSEN_TABLE_COLOR
        for (var key in this.salaTables) {
          if (key !== 'sala_9') {
            this.salaTables[key] = this.FREE_TABLE_COLOR
          }
        }
        break
      case 10:
        this.terrazaTables.terraza_10 = this.CHOSEN_TABLE_COLOR
        for (var key in this.terrazaTables) {
          if (key !== 'terraza_10') {
            this.terrazaTables[key] = this.FREE_TABLE_COLOR
          }
        }
        break
      case 11:
        this.terrazaTables.terraza_11 = this.CHOSEN_TABLE_COLOR
        for (var key in this.terrazaTables) {
          if (key !== 'terraza_11') {
            this.terrazaTables[key] = this.FREE_TABLE_COLOR
          }
        }
        break
      case 12:
        this.terrazaTables.terraza_12 = this.CHOSEN_TABLE_COLOR
        for (var key in this.terrazaTables) {
          if (key !== 'terraza_12') {
            this.terrazaTables[key] = this.FREE_TABLE_COLOR
          }
        }
        break
      case 13:
        this.terrazaTables.terraza_13 = this.CHOSEN_TABLE_COLOR
        for (var key in this.terrazaTables) {
          if (key !== 'terraza_13') {
            this.terrazaTables[key] = this.FREE_TABLE_COLOR
          }
        }
        break
      case 14:
        this.terrazaTables.terraza_14 = this.CHOSEN_TABLE_COLOR
        for (var key in this.terrazaTables) {
          if (key !== 'terraza_14') {
            this.terrazaTables[key] = this.FREE_TABLE_COLOR
          }
        }
        break
      case 15:
        this.barraTables.barra_15 = this.CHOSEN_TABLE_COLOR
        for (var key in this.barraTables) {
          if (key !== 'barra_15') {
            this.barraTables[key] = this.FREE_TABLE_COLOR
          }
        }
        break
      case 16:
        this.barraTables.barra_16 = this.CHOSEN_TABLE_COLOR
        for (var key in this.barraTables) {
          if (key !== 'barra_16') {
            this.barraTables[key] = this.FREE_TABLE_COLOR
          }
        }
        break
      case 17:
        this.barraTables.barra_17 = this.CHOSEN_TABLE_COLOR
        for (var key in this.barraTables) {
          if (key !== 'barra_17') {
            this.barraTables[key] = this.FREE_TABLE_COLOR
          }
        }
        break
      case 18:
        this.barraTables.barra_18 = this.CHOSEN_TABLE_COLOR
        for (var key in this.barraTables) {
          if (key !== 'barra_18') {
            this.barraTables[key] = this.FREE_TABLE_COLOR
          }
        }
        break
      case 19:
        this.barraTables.barra_19 = this.CHOSEN_TABLE_COLOR
        for (var key in this.barraTables) {
          if (key !== 'barra_19') {
            this.barraTables[key] = this.FREE_TABLE_COLOR
          }
        }
        break
      case 20:
        this.barraTables.barra_20 = this.CHOSEN_TABLE_COLOR
        for (var key in this.barraTables) {
          if (key !== 'barra_20') {
            this.barraTables[key] = this.FREE_TABLE_COLOR
          }
        }
        break
    }
  }
}
