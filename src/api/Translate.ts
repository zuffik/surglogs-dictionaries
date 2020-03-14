import axios from 'axios'

export const translate = axios.create({
  baseURL: 'https://translation.googleapis.com/language/translate/v2'
})
