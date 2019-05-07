<template>
  <tr class="search-engine-table-row">
    <td :class="nameClasses" v-text="name" />
    <td :class="urlClasses" v-text="url" />
    <td class="justify-center layout px-0">
      <v-btn icon class="mx-0" @click="onEditClick">
        <v-icon color="teal">edit</v-icon>
      </v-btn>
      <v-btn icon class="mx-0" @click="onDeleteClick">
        <v-icon color="pink">delete</v-icon>
      </v-btn>
    </td>
    <search-engine-dialog
      v-model="dialog"
      :inputs.sync="form"
      title="Edit Search Engine"
    />
  </tr>
</template>

<script>
import { mapMutations } from 'vuex'
import SearchEngineDialog from './SearchEngineDialog'

export default {
  components: {
    SearchEngineDialog
  },
  props: {
    item: {
      type: Object,
      required: true
    }
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
    nameClasses() {
      return {
        'grey--text': !this.item.name
      }
    },
    urlClasses() {
      return {
        'grey--text': !this.item.url
      }
    },
    name() {
      return this.item.name || 'Bing'
    },
    url() {
      return this.item.url || 'https://www.bing.com/search?q=%s'
    }
  },
  watch: {
    dialog(value) {
      if (!value && this.form) {
        this.setSearchEngine({
          id: this.item.id,
          searchEngine: this.form
        })
      }
    }
  },
  methods: {
    onEditClick() {
      this.form = this.item
      this.dialog = true
    },
    onDeleteClick() {
      this.removeSearchEngine({ id: this.item.id })
    },
    ...mapMutations('settings', ['setSearchEngine', 'removeSearchEngine'])
  }
}
</script>
