<template>
  <tr class="search-engine-table-row">
    <td :class="nameClasses" v-text="name" />
    <td :class="urlClasses" v-text="url" />
    <td>
      <v-icon class="mr-2" color="teal" @click="onEditClick">edit</v-icon>
      <v-icon color="pink" @click="onDeleteClick">delete</v-icon>
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
        name: true,
        ellipsis: true,
        'grey--text': !this.item.name
      }
    },
    urlClasses() {
      return {
        url: true,
        ellipsis: true,
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
    ...mapMutations(['setSearchEngine', 'removeSearchEngine'])
  }
}
</script>

<style scoped>
.name {
  max-width: 128px;
}
.url {
  max-width: 256px;
}
</style>
