<template>
  <v-app>
    <v-content>
      <v-container class="pa-0" fluid>
        <v-card class="pa-3" flat>
          <v-layout>
            <v-spacer />
            <v-btn color="primary" depressed @click="onAddClick">
              Add Search Engine
            </v-btn>
          </v-layout>
          <search-engine-table />
          <v-btn
            class="mt-3"
            color="primary"
            depressed
            block
            @click="onOKClick"
          >
            OK
          </v-btn>
          <search-engine-dialog v-model="dialog" :item.sync="form" />
        </v-card>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import SearchEngineDialog from './SearchEngineDialog'
import SearchEngineTable from './SearchEngineTable'

export default {
  components: {
    SearchEngineDialog,
    SearchEngineTable
  },
  data() {
    return {
      dialog: false,
      form: {}
    }
  },
  computed: {
    ...mapState('settings', ['searchEngines'])
  },
  watch: {
    dialog(value) {
      if (!value && this.form) {
        this.addSearchEngine({ searchEngine: { ...this.form } })
      }
    },
    searchEngines(value, oldValue) {
      if (value.length > oldValue.length) {
        this.$nextTick(() => {
          window.scrollTo(0, document.body.scrollHeight)
        })
      }
    }
  },
  methods: {
    onAddClick() {
      this.dialog = true
    },
    onOKClick() {
      window.close()
    },
    ...mapMutations('settings', ['addSearchEngine'])
  }
}
</script>

<style>
@import '~vuetify/dist/vuetify.min.css';
</style>

<style scoped>
.application {
  min-width: 512px;
  min-height: 512px;
}
</style>
