import store from '../store'

export default (to, from, next) => {
  if (store.getters['auth/check']) {
    if (store.getters['auth/user'].role_id !== 1) {
      next({ name: 'error' })
    } else {
      next()
    }
  } else {
    next({ name: 'login' })
  }
}
