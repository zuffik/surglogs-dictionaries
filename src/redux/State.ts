import { User } from '../types/User'
import { database } from '../services/Database'
import { Dictionary } from '../types/Dictionary'
import { Language } from '../types/Language'
import { Resource } from '../types/api/Resource'

export class State {
  public user?: User
  public dictionaries: Dictionary[] = []

  public possibleLanguages: Resource<Language[]> = new Resource<Language[]>()
  public defaultOriginLanguage: Language
  public defaultTargetLanguage: Language

  public formDictionary?: Dictionary
  public translations: Record<string, Resource<string[]>> = {}

  constructor () {
    this.user = database.getItem('user')
    if (this.user) {
      this.dictionaries = database.getItem<{[K: string]: Dictionary[]}>('dictionaries', {})[this.user.email] || []
    }
    this.defaultOriginLanguage = {
      label: 'Slovak',
      code: 'sk'
    }
    this.defaultTargetLanguage = {
      label: 'English',
      code: 'en'
    }
  }
}
