import { User } from '../types/User'
import { LocalStorage } from './LocalStorage'
import { Dictionary } from '../types/Dictionary'

export interface Database {
  user?: User
  dictionaries: Dictionary[]
}

export const database = new LocalStorage<Database>()
