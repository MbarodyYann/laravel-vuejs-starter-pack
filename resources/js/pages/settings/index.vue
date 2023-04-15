<template>
  <div>
    <v-navigation-drawer
      app
      fixed
      width="300"
    >
      <v-card
        outlined
        tile
      >
        <div class="mr-6">
          <v-list
            subheader
            two-line
          >
            <v-subheader>Général</v-subheader>

            <v-list-item
              v-for=" (item, index) in genaral"
              :key="index"
              :to="item.route"
            >
              <v-list-item-avatar>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.titre }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.subtitle }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider />

          <v-list
            v-if="user.role_id===1"
            subheader
          >
            <v-subheader>Gestion des donnés</v-subheader>

            <div
              v-for=" (item, index) in donnes"
              :key="index+12"
            >
              <template v-if="index===3 || index === 4">
                <v-list-group
                  v-model="item.active"
                  no-action
                >
                  <template v-slot:activator>
                    <v-list-item-avatar>
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.titre"></v-list-item-title>
                    </v-list-item-content>
                  </template>

                  <v-list-item
                    v-for="child in item.items"
                    :key="child.titre"
                    :to="child.route"
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ child.titre }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-group>
              </template>
              <template v-else>
                <v-list-item
                  :to="item.route"
                >
                  <v-list-item-avatar>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item.titre }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </div>
          </v-list>
        </div>
      </v-card>

    </v-navigation-drawer>

    <div>
      <v-container class="d-flex align-center justify-center">
        <router-view />
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  middleware: 'auth',
  data () {
    return {

    }
  },

  computed: {
    genaral () {
      return [
        {
          icon: 'mdi-account',
          titre: 'Profil',
          subtitle: 'Modifier votre profil',
          route: 'profile'
        },
        {
          icon: 'mdi-lock',
          titre: 'Mot de passe',
          subtitle: 'Changer de mot de passe',
          route: 'password'
        }
      ]
    },
    donnes () {
      return [
        {
          icon: 'mdi-map-marker',
          titre: 'Region',
          route: 'region'
        },
        {
          icon: 'mdi-briefcase',
          titre: 'Projet',
          route: 'projet'
        },
        {
          icon: 'mdi-account-hard-hat',
          titre: 'Type (Personne)',
          route: 'type'
        },
        {
          icon: 'mdi-account-group',
          titre: 'Personnes',
          route: 'utilisateur',
          items: [
            {
              titre: 'Default',
              route: 'personnes-default'
            },
            {
              titre: 'Aprobateurs',
              route: 'personnes-approbeur'
            },
            {
              titre: 'Financier',
              route: 'personnes-financier'
            },
            {
              titre: 'Chauffeur',
              route: 'personnes-chauffeur'
            }
          ]
        },
        {
          icon: 'mdi-account-group',
          titre: 'Comptes',
          route: 'utilisateur',
          items: [
            {
              titre: 'Administrateurs',
              route: 'comptes-admin'
            },
            {
              titre: 'Default',
              route: 'comptes-default'
            },
            {
              titre: 'Logistique',
              route: 'comptes-logistique'
            },
            {
              titre: 'Finance',
              route: 'comptes-finance'
            },
            {
              titre: 'Approbateur',
              route: 'comptes-approbeur'
            }
          ]
        },
        {
          icon: 'mdi-train-car',
          titre: 'Transport',
          route: 'transport'
        },
        {
          icon: 'mdi-list-status',
          titre: 'Statut (mission)',
          route: 'statut'
        }
      ]
    },
    ...mapGetters({
      user: 'auth/user'
    })
  },
  mounted () {
  },

  methods: {
    collapseSubItems () {
      this.nav.map((item) => item.active = false)
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}

</style>
