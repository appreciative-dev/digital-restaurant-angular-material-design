import { Observable } from 'rxjs'
import { PaginationRequest } from '../model/pagination.model'

export interface RepositoryEntity {
  id?: string
  timestamp?: Date
  updated?: Date
  status?: RepositoryEntityStatus
}

export type RepositoryEntityStatus = 'active' | 'archived'
export type RepositoryEntityAction = 'create' | 'edit' | 'list' | 'detail' | 'status' | 'log'

export interface RepositoryResponseEntity {
  id: string
}

export interface RepositoryLayoutService {
  getAll<T>(): Observable<T[]>

  getById<T>(id: string): Observable<T>

  getTotalByStatus<S>(status: S): Observable<number>

  getFirstPage<T, S>(order: OrderRequest, size: number, status: S): Observable<T[]>

  getNextPage<T, S, V>(order: OrderRequest, size: number, status: S, value: V): Observable<T[]>

  getPreviousPage<T, S, V>(order: OrderRequest, size: number, status: S, value: V): Observable<T[]>

  getAllByQuery<T>(property: string, value: string): Observable<T[]>

  create<T>(item: T): Observable<RepositoryResponseEntity>

  update<T>(item: T, id: string): Observable<void>

  updateStatus<T>(id: string, status: T): Observable<void>
}

export interface RepositoryResponseList<T> {
  data?: T[]
  total?: number
  current?: number
}

export type RepositoryRequestQuery = 'first' | 'next' | 'previous' | 'custom'

export type RepositoryRequestOrder = 'desc' | 'asc'

export interface RepositoryRequest<T, S> {
  query: RepositoryRequestQuery
  pagination: PaginationRequest<T>
  filter: FilterRequest<S>
  order: OrderRequest
}

export interface FilterRequest<S> {
  status: S
  field: FilterField
}

export interface OrderRequest {
  key: string
  value: RepositoryRequestOrder
}

export interface FilterField {
  key: string
  value: string
}

export interface Log<T> {
  item: T
  id: string
  timestamp: Date
}
