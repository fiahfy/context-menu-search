<template>
  <v-toolbar class="search-engine-table-toolbar" flat color="transparent">
    <spacer />
    <v-btn
      v-if="selected.length"
      color="error"
      depressed
      @click="handleClickDelete"
    >
      Delete {{ selected.length }} Search Engine(s)
    </v-btn>
    <v-btn v-else color="primary" depressed @click="handleClickNew">
      New Search Engine
    </v-btn>
    <search-engine-dialog
      v-model="state.dialog"
      @click:cancel="handleClickCancel"
      @click:save="handleClickSave"
    />
    <v-dialog v-model="state.confirmDialog" max-width="360">
      <v-card>
        <v-card-title primary-title>
          <span class="title"
            >Delete {{ selected.length }} search engine(s)?</span
          >
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="handleClickCancelConfirm">Cancel</v-btn>
          <v-btn color="error" text @click="handleClickSubmit">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-toolbar>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext } from '@vue/composition-api'
import SearchEngineDialog from '~/components/SearchEngineDialog.vue'
import { SearchEngine } from '~/models'
import { settingsStore } from '~/store'

type Props = {
  selected: SearchEngine[]
}

export default defineComponent({
  components: {
    SearchEngineDialog,
  },
  props: {
    selected: {
      type: Array,
      default: () => [],
    },
  },
  setup(props: Props, context: SetupContext) {
    const state = reactive<{
      dialog: boolean
      confirmDialog: boolean
    }>({
      dialog: false,
      confirmDialog: false,
    })

    const handleInputQuery = (value: string) => {
      context.emit('update:query', value)
      context.emit('update:selected', [])
    }
    const handleClickDelete = () => {
      state.confirmDialog = true
    }
    const handleClickCancelConfirm = () => {
      state.confirmDialog = false
    }
    const handleClickSubmit = () => {
      state.confirmDialog = false
      settingsStore.removeSearchEngines({
        ids: props.selected.map((item) => item.id),
      })
      context.emit('update:selected', [])
    }
    const handleClickNew = () => {
      state.dialog = true
    }
    const handleClickCancel = () => {
      state.dialog = false
    }
    const handleClickSave = (item: SearchEngine) => {
      state.dialog = false
      settingsStore.addSearchEngine(item)
    }

    return {
      state,
      handleInputQuery,
      handleClickDelete,
      handleClickCancelConfirm,
      handleClickSubmit,
      handleClickNew,
      handleClickCancel,
      handleClickSave,
    }
  },
})
</script>
