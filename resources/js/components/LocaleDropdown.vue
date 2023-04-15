<template>
  <v-menu
      v-if="Object.keys(locales).length > 1"
      left
      bottom
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          text
          v-bind="attrs"
          v-on="on"
      >
        {{ locales[locale] }}
      </v-btn>
    </template>

    <v-list>
      <v-list-item
          v-for="(value, key) in locales" :key="key"
          @click.prevent="setLocale(key)"
      >
        <v-list-item-title>
          {{ value }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import { loadMessages } from '../ajouts/plugins/i18n'

export default {
  computed: mapGetters({
    locale: 'lang/locale',
    locales: 'lang/locales'
  }),

  methods: {
    setLocale (locale) {
      if (this.$i18n.locale !== locale) {
        loadMessages(locale)

        this.$store.dispatch('lang/setLocale', { locale })
      }
    }
  }
}
</script>
