import * as _ from 'lodash'

export class LocalStorage<I extends {}> {
  getItem<T extends I[K], K extends keyof I = keyof I> (key: K, def?: T): T {
    const value = localStorage.getItem(key as string)
    if (!value || value === 'undefined') {
      return def as T
    }
    return JSON.parse(value)
  }

  setItem<T extends I[K], K extends keyof I> (key: K, value: T): void {
    if (value === undefined || value === null) {
      this.removeItem(key)
    } else {
      localStorage.setItem(key as string, JSON.stringify(value))
    }
  }

  updateItem<E extends I[K], T, K extends keyof I> (
    key: K,
    path: _.PropertyPath,
    value: T
  ): void {
    const item: E = this.getItem<E, K>(key) as E
    this.setItem(key, _.set<E>(item as any, path, value))
  }

  removeItem<T> (key: keyof I): boolean {
    const exists = !!localStorage.getItem(key as string)
    localStorage.removeItem(key as string)
    return exists
  }

  clear () {
    localStorage.clear()
  }

  keys (): string[] {
    return Object.keys(localStorage)
  }
}
