import store from '../store'

export default async (to, from, next) => {
  console.log('middleware check-auth invoked')
  if (!store.getters['auth/check'] && store.getters['auth/token']) {
    try {
      console.log('check-auth -> fetch auth invoked')
      await store.dispatch('auth/fetchUser')
    } catch (e) { }
  }

  next()
}
