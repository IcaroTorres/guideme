<template>
  <v-dialog v-model="dialog" width="600px" scrollable >
    <template slot="activator">
      <slot name="customactivator"  @click.stop="dialog = !dialog" />
    </template>
    <v-card>
      <v-form v-model="inviteValid"></v-form>
      <v-card-title class="py-4 title primary">
        Search users to invite to this project
      </v-card-title>
      <v-card-text height="600">
        <div class="subheading primary--text">{{project.title}}</div>
        <hr>
        <div class="captin grey--text">{{project.description}}</div>
        <v-container grid-list-xs class="pa-0">
          <v-layout row wrap>
            <v-flex xs12>
              <v-autocomplete
                prepend-icon="group_add"
                label="users to invite"
                :items="searchableUsers"
                v-model="invitable" 
                requred
                :rules="[v => !!v || 'field required']"
                item-text="username"
                :item-value="item => item.id"
                multiple
              >
                <template slot="item" slot-scope="data"  class="pa-0">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-tile-content v-text="data.item"></v-list-tile-content>
                  </template>
                  <template v-else>
                    <v-list-tile-avatar>
                      <img :src="useravatar(data.item.id)">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title v-html="data.item.username"/>
                      <v-list-tile-sub-title class="caption grey--text" v-html="data.item.displayName"/>
                    </v-list-tile-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-flex>
            <v-flex xs12 align-center justify-space-between>
              <v-textarea
                outline
                label="invitation message"
                v-model="message"
              ></v-textarea>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
        <v-btn round color="info" @click.stop="onInvite">
          send invitation
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'dialoginviteuser',
  props: {
    project: Object
  },
  data () {
    return {
      inviteValid: false,
      dialog: false,
      invitable: [],
      message: ''
    }
  },
  computed: {
    ...mapState(['users']),
    ...mapGetters(['useravatar']),
    includedUsers () { return this.project.team },
    searchableUsers () { return Object.values(this.users).filter(u => this.includedUsers.indexOf(u.id) === -1) }
  },
  methods: {
    ...mapActions(['invite']),
    onInvite () {
      if (this.inviteValid) {
        this.invite({pid: this.project.id, uids: this.invitable})
          .then(response => {
            // console.log(response)
            this.dialog = false
          })
      }
    }
  }
}
</script>
