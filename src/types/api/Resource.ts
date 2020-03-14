export class Resource<T> {
  public loading: boolean = false
  constructor (public data?: T) {}

  public start () {
    this.loading = true
  }

  public finish (data: T) {
    this.data = data
    this.loading = false
  }

  public get hasData (): boolean {
    return typeof this.data === 'undefined'
  }
}
