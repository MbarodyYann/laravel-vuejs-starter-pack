import store from '../store'
import { loadMessages } from '../plugins/i18n'

export default async (to, from, next) => {
  console.log('middleware locale invoked')
  await loadMessages(store.getters['lang/locale'])
  next()
}
