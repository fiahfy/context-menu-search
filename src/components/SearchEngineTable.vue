<template>
  <v-data-table
    v-model="state.selected"
    :headers="headers"
    :items="searchEngines"
    :mobile-breakpoint="0"
    :items-per-page="-1"
    class="search-engine-table"
    hide-default-footer
    show-select
  >
    <template #top>
      <search-engine-table-toolbar
        :selected.sync="state.selected"
        :query.sync="state.search"
      />
      <search-engine-dialog
        v-model="state.dialog"
        editing
        :form="state.form"
        @click:cancel="handleClickCancel"
        @click:save="handleClickSave"
        @click:delete="handleClickDelete"
      />
    </template>
    <template #item="props">
      <search-engine-table-row
        v-bind="props"
        @click.native="() => handleClickRow(props.item)"
      />
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from '@vue/composition-api'
import SearchEngineDialog from '~/components/SearchEngineDialog.vue'
import SearchEngineTableRow from '~/components/SearchEngineTableRow.vue'
import SearchEngineTableToolbar from '~/components/SearchEngineTableToolbar.vue'
import { SearchEngine } from '~/models'
import { settingsStore } from '~/store'

const headers = [
  { text: 'Name', value: 'name' },
  { text: 'Query URL', value: 'url' },
  { text: 'Actions', sortable: false },
]

export default defineComponent({
  components: {
    SearchEngineDialog,
    SearchEngineTableRow,
    SearchEngineTableToolbar,
  },
  setup() {
    const state = reactive<{
      selected: SearchEngine[]
      search: string
      dialog: boolean
      form?: Partial<SearchEngine>
    }>({
      selected: [],
      search: '',
      dialog: false,
      form: undefined,
    })

    const searchEngines = computed(() => {
      return settingsStore.searchEngines.concat().reverse()
    })

    const handleClickRow = (item: SearchEngine) => {
      state.form = item
      state.dialog = true
    }
    const handleClickCancel = () => {
      state.dialog = false
    }
    const handleClickSave = (item: SearchEngine) => {
      state.dialog = false
      settingsStore.setSearchEngine({
        ...item,
        id: item.id,
      })
    }
    const handleClickDelete = (item: SearchEngine) => {
      state.dialog = false
      settingsStore.removeSearchEngine({ id: item.id })
    }

    return {
      headers,
      state,
      searchEngines,
      handleClickRow,
      handleClickCancel,
      handleClickSave,
      handleClickDelete,
    }
  },
})
</script>
