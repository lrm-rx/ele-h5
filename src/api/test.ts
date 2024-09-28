import axios from './base'

export function fetchTest() {
  return axios.get('test')
}
