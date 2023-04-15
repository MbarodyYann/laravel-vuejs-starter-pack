// i18n.js
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enMessages from '../lang/en.json'
import esMessages from '../lang/es.json'
import frMessages from '../lang/fr.json'
import ptBRMessages from '../lang/pt-BR.json'
import zhCNMessages from '../lang/zh-CN.json'

Vue.use(VueI18n)

const i18n = new VueI18n({
    locale: 'en',
    messages: {
        en: enMessages,
        fr: frMessages,
        es: esMessages,
        'pt-BR': ptBRMessages,
        'zh-CN': zhCNMessages
    }
})

/**
 * @param {String} locale
 */
export async function loadMessages (locale) {
    if (i18n.locale !== locale) {
        i18n.locale = locale
    }
}

export default i18n