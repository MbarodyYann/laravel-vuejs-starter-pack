<template>
  <div>
    <v-app-bar
        color="deep-purple accent-4"
        app
        dark
    >
      <v-app-bar-nav-icon ></v-app-bar-nav-icon>

      <v-toolbar-title>
        <router-link :to="{ name: 'home'}">
          <img
              height="50"
              src="/logo.svg"
          >
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn text @click="test">test</v-btn>
      <LocaleDropdown></LocaleDropdown>

      <template v-if="user">
        <v-menu
            left
            bottom
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                text
                v-bind="attrs"
                v-on="on"
            >
              {{ user.name }}
            </v-btn>
          </template>

          <v-list>
            <v-list-item :to="{ name: 'settings.profile' }">
              <v-list-item-title>
                <b-icon icon="gear-fill" aria-hidden="true"></b-icon> {{ $t('settings') }}
              </v-list-item-title>
            </v-list-item>

            <v-list-item @click.prevent="logout">
              <v-list-item-title>
                <b-icon icon="power" aria-hidden="true"></b-icon> {{ $t('logout') }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-else>
        <v-btn :to="{ name: 'login' }" text small>
          {{ $t('login') }}
        </v-btn>
        <!--              <router-link :to="{ name: 'register' }" class="nav-link" active-class="active">-->
        <!--                {{ $t('register') }}-->
        <!--              </router-link>-->
      </template>
    </v-app-bar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import axios from "axios";
import LocaleDropdown from "./LocaleDropdown";

export default {
  name: 'Navbar',
    components: {LocaleDropdown},
    data: () => ({
    appName: "Titre",
    fetchingData: false,
    // filtre: ['Sans filtre', 'En attente', 'En cours', 'Traité'],
    filtre: [
      {
        nom: 'logistique',
        filtres: {
          content: ['Sans filtre', 'En attente', 'En cours', 'Financé', 'Signé'],
          filtresId: [0, 1, 2, 3, 4]
        }
      },
      {
        nom: 'finance',
        filtres: {
          content: ['Sans filtre', 'En attente', 'Financé'],
          filtresId: [0, 2, 3]
        }
      },
      {
        nom: 'approbateur',
        filtres: {
          content: ['Sans filtre', 'A signer', 'Signé'],
          filtresId: [0, 3, 4]
        }
      }
    ]
  }),

  computed: {
    quelfiltre () {
      let filtres = []
      for (const item of this.filtre) {
        if (this.$route.name === item.nom) {
          filtres = item.filtres
          break
        }
      }
      return filtres
    },
    showFiltre () {
      const routes = [
        'logistique',
        'finance',
        'admin',
        'voirpanne',
        'home',
        'approbateur'
      ]
      return this.user ? routes.includes(this.$route.name) : false
    },
    ...mapGetters({
      user: 'auth/user'
    })
  },

  methods: {
    test(){
      this.test2()
    },
    async test2(){
      await axios.get("/sanctum/csrf-cookie").then( response => {
        axios.post("/api/login",{
              email: 'a@b.c', password: 'carrapide2'
            },
        ).then( async () => {
          await this.$store.dispatch('auth/saveToken', 'authentification')
          // Fetch the user.
          await this.$store.dispatch('auth/fetchUser')
        })
      });
    },
    async test1(){
      await axios.post("/api/login",{
            email: 'a@b.c', password: 'carrapide2'
          },
      ).then( async (response) => {
        //console.log(response.data.data.token)
        await this.$store.dispatch('auth/saveToken', response.data.data.token)
        // Fetch the user.
        await this.$store.dispatch('auth/fetchUser')
        // Redirect home.
      })
    },
    async logout () {
      // Log out the user.
      await this.$store.dispatch('auth/logout')

      // Redirect to login.
      // await this.$router.push({ name: 'login' })
      window.location.reload()
    },
    async appliquerFiltre (index) {
      this.fetchingData = true

      index === 0
        ? await this.$store.dispatch('mission/fetchMaint')
        : await this.$store.dispatch('mission/setFiltre', {
          statutId: this.quelfiltre.filtresId[index]
        })

      this.fetchingData = false
    }
  }
}
</script>

<style scoped>
.profile-photo {
  width: 2rem;
  height: 2rem;
  margin: -.375rem 0;
}
</style>
