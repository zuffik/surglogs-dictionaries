import axios from 'axios'

export const tts = axios.create({
  baseURL: 'https://texttospeech.googleapis.com/v1/text:synthesize'
})
