import Vue from 'vue'
import Vuetify from 'vuetify'
import fr from 'vuetify/src/locale/fr.ts'

import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

const opts = {
  lang: {
    locales: { fr },
    current: 'fr'
  },
  icons: {
    iconfont: 'mdi' // default - only for display purposes
  },
  theme: {
    themes: {
      light: {
        primary: '#58585a',
        accent: '#db2e2d',
        secondary: '#ffcd15',
        hero: '#3e3e41'
      },
      dark: {
        primary: '#ffcd15',
        accent: '#db2e2d',
        secondary: '#58585a',
      }
    }
  }
}

export default new Vuetify(opts)
