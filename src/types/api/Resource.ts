export class Resource<T> {
    public loading: boolean = false
    public data?: T;

    constructor (data?: T) {
      this.data = data
    }

    public start () {
      this.loading = true
    }

    public finish (data: T) {
      this.data = data
      this.loading = false
    }

    public get hasData (): boolean {
      return typeof this.data !== 'undefined'
    }
}
