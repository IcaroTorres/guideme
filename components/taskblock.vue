<template>
  <v-flex class="mr-2 project-block-container">
    <v-card light :class=" block.color + ' block-card'" >
      <v-card-actions style="position: relative;">
        <v-layout row align-center justify-center>
          <v-card :color="color" v-for="color in colorOptions" :key="color" hover @click="chooseColor(color)" height="15" />
        </v-layout>
        <v-flex class="pa-0">
          <v-form @submit.prevent="updateBlockText" ref="blocktext" v-model="valid">
            <v-text-field
              class="pa-0"
              full-width
              v-model.trim="blocktext"
              solo-inverted
              :hide-details="valid"
              required
              :rules="[v => !!v || 'block text required']"
              @change="updateBlockText"
            >
              <!-- :label="isEditing ? 'Editing' : ''" -->
              <!-- :color="isEditing ? 'black' : block.color" -->
              <!-- <v-slide-x-transition
                slot="prepend-inner"
                mode="out-in"
              >
                <v-icon
                  small
                  :color="isEditing ? 'white' : 'black'"
                  :key="`icon-${isEditing}`"
                  @click="updateBlockText"
                  v-text="isEditing ? 'save' : 'edit'"/>
              </v-slide-x-transition> -->
            </v-text-field>
          </v-form>
        </v-flex>
        <v-flex class="pa-0 text-xs-center" style="max-width: 32px;">
          <v-tooltip top v-if="block.tasks.length === 0">
            <dblockdel :blockid="block.id" slot="activator">
              <v-btn small flat icon slot="customactivator">
                <v-icon>close</v-icon>
              </v-btn>
            </dblockdel>
            <span>remove block</span>
          </v-tooltip>
          <v-icon
            small
            @click="showcolors = !showcolors"
            :color="showcolors ? 'white' : 'black'"
            v-text="'format_color_fill'"/>
          <!-- <v-menu
            v-model="menu"
            :close-on-content-click="false"
          >
            <v-icon
              small
              slot="activator"
              :color="isEditing ? 'white' : 'black'"
              :key="`icon-${menu}`"
              v-text="'format_color_fill'"/>
            <v-card>
              <v-card-actions>
                <v-autocomplete
                  dense
                  class="mx-2"
                  append-icon="save"
                  label="color"
                  v-model="newcolor"
                  @change="updateBlockColor"
                  :items="colors"
                >
                  <template slot="item" slot-scope="data" >
                    <v-list-tile-content :class="data.item">
                      <v-list-tile-title></v-list-tile-title>
                    </v-list-tile-content>
                  </template>
                </v-autocomplete>
              </v-card-actions>
            </v-card>
          </v-menu> -->
        </v-flex>
      </v-card-actions>
    </v-card>
    <v-card
      :class="`transparent project-block scroller scroller__${block.color}`"
      flat style="position: relative;"
    >
      <taskcards :value="blocktasks"/>
    </v-card>
    <v-toolbar :class="'block-footer ' +  block.color" dense>
      <v-tooltip top>
        <v-btn icon @click="updatePosition(0)"  slot="activator" >
          <v-icon>first_page</v-icon>
        </v-btn>
        <span>move to first</span>
      </v-tooltip>
      <v-tooltip top>
        <v-btn icon @click="updatePosition(1)"  slot="activator" >
          <v-icon>chevron_left</v-icon>
        </v-btn>
        <span>move backward</span>
      </v-tooltip>
      <v-spacer/>
      <dtask 
        :blockid="block.id"
        @task-saved="onTaskSaved"
      >
        <v-btn 
          small 
          class="border-dashed-dark ma-0" slot="customactivator" 
          style="min-width: 100%"
        >
          <v-icon small>add</v-icon> add task
        </v-btn>
      </dtask>
      <v-spacer/>
      <v-tooltip top>
        <v-btn icon @click="updatePosition(2)"  slot="activator" >
          <v-icon>chevron_right</v-icon>
        </v-btn>
        <span>move forward</span>
      </v-tooltip>
      <v-tooltip top>
        <v-btn icon @click="updatePosition(-1)" slot="activator" >
          <v-icon >last_page</v-icon>
        </v-btn>
        <span>move to last</span>
      </v-tooltip>
      
    </v-toolbar>
  </v-flex>
</template>

<script lang="js">
import taskcards from '@/components/taskcards'
import { dtask, dblockdel } from '@/components/dialog'
import { colors } from '@/helpers'
import { mapState } from 'vuex'
export default {
  name: 'taskblock',
  components: {taskcards, dtask, dblockdel},
  props: {
    blockid: { required: true, type: [String, Number] }
  },
  data: () => ({
    blocktext: '',
    valid: false,
    menu: false,
    showcolors: false,
    isEditing: false,
    newcolor: '',
    colorOptions: [
      'primary', 'secondary', 'accent', 'info', 'warning', 'error', 'success'
    ]
  }),
  created () {
    this.blocktext = this.block.text
  },
  computed: {
    ...mapState(['blocks', 'tasks']),
    block: {
      get () {
        return this.blocks[this.blockid]
      },
      set (val) {
        if (val && val.text) {
          this.blocktext = val.text
        }
      }
    },
    blocktasks () {
      return this.block.tasks.map(tid => this.tasks[tid])
    },
    colors () { return Object.keys(colors) }
  },
  methods: {
    onTaskSaved () {
      this.$emit('block-update', this.block)
    },
    updateBlockText () {
      if (!this.valid) {
        this.blocktext = this.block.text
      } else {
        this.$store.dispatch('updateBlockText', {
          ...this.block, text: this.blocktext
        }).catch(error => this.setError(error))
      }
    },
    updateBlockColor () {
      // console.log('new color tried', this.newcolor)
      if (this.colors.includes(this.newcolor)) {
        // console.log('trying to update text')
        this.$store.dispatch('updateBlockColor', {
          ...this.block, color: this.newcolor
        })
          .then(response => {
            // console.log(response, 'new block value')
            this.menu = false
          })
          .catch(error => this.setError(error))
      }
    },
    chooseColor (color) {
      this.$store.dispatch('updateBlockColor', {
        ...this.block, color: color
      })
        .then(response => {
          // console.log(response, 'new block value')
          this.showcolors = false
        })
        .catch(error => this.setError(error))
    },
    updatePosition (int) {
      this.$store.dispatch('updateBlockPosition', {
        block: this.block, movetype: int
      })
    }
  }
}
</script>

<style scoped>
.v-text-field__details {
  padding: auto !important;
}
.v-text-field.v-text-field--enclosed .v-text-field__details {
    margin-bottom: 0px !important;
}
</style>

