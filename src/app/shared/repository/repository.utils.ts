import { Observable, UnaryFunction, pipe, retry, take, throwError, timeout } from 'rxjs'
import { NotificationService } from '../services/notification.service'
import { RepositoryRequestQuery } from './repository.model'
import * as moment from 'moment'

const REQUEST_TIME_LIMIT_VALUE = 5000
const REQUEST_TIME_LIMIT_ERROR_CODE = 'REQUEST_TIME_LIMIT_ERROR'

export const appendId = <T>(documents): T =>
  documents.map((value) => ({
    ...value.payload.doc.data(),
    id: value.payload.doc.id,
  }))

export const responseTransform = <T>(notificationService: NotificationService): UnaryFunction<Observable<T>, Observable<T>> =>
  pipe(
    take(1),
    timeout({
      each: REQUEST_TIME_LIMIT_VALUE,
      with: () => {
        notificationService.notifyConnectionWarning()
        return throwError(() => REQUEST_TIME_LIMIT_ERROR_CODE)
      },
    }),
    retry({ count: 2 })
  )

export const formatPaginationData = (state, response, total, query: RepositoryRequestQuery) => {
  let current, responseTotal
  switch (query) {
    case 'first':
      responseTotal = total
      current = response.length
      break
    case 'custom':
      responseTotal = total
      current = response.length
      break
    case 'next':
      responseTotal = state.clients.total
      current = state.clients.current + response.length
      break
    case 'previous':
      responseTotal = state.clients.total
      current = state.clients.current - response.length
      break
  }
  return {
    responseTotal,
    current,
  }
}

export const requestDuration = (time: Date): number => (time ? +(moment(new Date()).diff(time, 'milliseconds') / 1000).toFixed(2) : null)
