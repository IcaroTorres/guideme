<template>
    <v-dialog v-model="dialog" width="600px">
      <template slot="activator" @click.stop="dialog = !dialog">
        <slot name="customactivator" />
      </template>
      <v-form ref="blockform_dialog" v-model="valid" @submit.prevent="saveBlock">
      <v-card >
        <v-card-title :class="{'py-4 title': true, 'primary': !!project, 'warning': !project }">
          {{dialogtitle}}
        </v-card-title>
        <v-container fluid grid-list-md>
            <v-layout row wrap align-content-start justify-center>
              <v-flex  xs12 md7>
                <v-text-field
                  class="mx-2"
                  label="Block text"
                  required
                  :rules="[v => !!v || 'field required']"
                  v-model.trim="editing.text"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md5>
                <v-autocomplete
                  dense
                  class="mx-2"
                  append-icon="brush"
                  label="color"
                  required
                  :rules="[
                    v => !!v || 'field required',
                    v => colors.includes(v) || 'color value not supported'
                  ]"
                  v-model.trim="editing.color"
                  :items="colors"
                >
                  <template slot="item" slot-scope="data" >
                    <v-list-tile-content :class="data.item">
                      <v-list-tile-title></v-list-tile-title>
                    </v-list-tile-content>
                  </template>
                </v-autocomplete>
              </v-flex>
            </v-layout>
        </v-container>
        <v-card-actions class="px-4">
          <v-spacer></v-spacer>
          <v-btn flat small color="primary" @click.stop="dialog = false">Cancel</v-btn>
          <v-btn small color="success" type="submit">save</v-btn>
        </v-card-actions>
      </v-card>
      </v-form>
    </v-dialog>
</template>

<script>
import {Block} from '@/models'
import {colors} from '@/helpers'
export default {
  name: 'dialogblock',
  props: {
    project: {
      type: Object,
      required: true
    },
    block: Object
  },
  data () {
    return {
      valid: false,
      dialog: false,
      editing: new Block({...this.block, project: this.project.id})
    }
  },
  computed: {
    dialogtitle () { return this.block ? `Editing ${this.block.text}` : 'New Block' },
    colors () { return Object.keys(colors) }
  },
  methods: {
    saveBlock () {
      if (this.valid && this.$refs.blockform_dialog.validate()) {
        this.$store.dispatch('saveBlock', this.editing)
          .then((data) => {
            this.$emit('block-created')
            if (!this.block) {
              this.editing = new Block({project: this.project.id})
            }
            this.dialog = false
          })
      }
    }
  }
}
</script>
