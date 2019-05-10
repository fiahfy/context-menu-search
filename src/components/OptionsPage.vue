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
          <search-engine-dialog v-model="dialog" :inputs.sync="form" />
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
      form: {
        name: '',
        url: ''
      }
    }
  },
  computed: {
    ...mapState(['searchEngines'])
  },
  watch: {
    dialog(value) {
      if (!value && this.form) {
        this.addSearchEngine({ searchEngine: this.form })
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
    ...mapMutations(['addSearchEngine'])
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
