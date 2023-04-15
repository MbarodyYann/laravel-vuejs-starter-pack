import Cookies from 'js-cookie'
import * as types from '../mutation-types'

const locale = 'fr'
const locales = {
  'en': 'EN',
  'es': 'ES',
  'fr': 'FR',
  'pt-BR': 'BR',
  'zh-CN': '中文'
};

// state
const state = {
  locale: getLocale(locales, locale),
  locales: locales
}

// getters
const getters = {
  locale: state => state.locale,
  locales: state => state.locales
}

// mutations
const mutations = {
  [types.SET_LOCALE] (state, { locale }) {
    state.locale = locale
  }
}

// actions
const actions = {
  setLocale ({ commit }, { locale }) {
    commit(types.SET_LOCALE, { locale })

    Cookies.set('locale', locale, { expires: 365 })
  }
}

/**
 * @param  {{"pt-BR": string, en: string, fr: string, "zh-CN": string, es: string}} locales
 * @param  {String} fallback
 * @return {String}
 */
function getLocale (locales, fallback) {
  const locale = Cookies.get('locale')

  if (Object.prototype.hasOwnProperty.call(locales, locale)) {
    return locale
  } else if (locale) {
    Cookies.remove('locale')
  }

  return fallback
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
