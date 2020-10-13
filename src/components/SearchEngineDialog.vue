<template>
  <v-dialog
    v-model="dialog"
    class="search-engine-dialog"
    max-width="480"
    persistent
  >
    <v-form ref="formRef" v-model="state.valid" lazy-validation>
      <v-card>
        <v-card-title primary-title>
          <span class="title" v-text="title" />
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="state.form.name"
            label="Name"
            placeholder="Bing"
            required
          />
          <v-text-field
            v-model="state.form.url"
            :rules="urlRules"
            label="Query URL"
            placeholder="https://www.bing.com/search?q=%s"
            hint="%s=search word"
            required
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click.native="handleClickCancel">Cancel</v-btn>
          <v-btn color="primary" text @click.native="handleClickSave">
            Save
          </v-btn>
          <v-btn
            v-if="editing"
            color="error"
            text
            @click.native="handleClickConfirm"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
    <v-dialog v-model="state.dialog" max-width="360">
      <v-card>
        <v-card-title primary-title>
          <span class="title">Delete this search engine?</span>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="handleClickCancelConfirm">Cancel</v-btn>
          <v-btn color="error" text @click="handleClickSubmit">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  reactive,
  watch,
  SetupContext,
} from '@vue/composition-api'
import { VForm } from 'vuetify/lib'
import { SearchEngine } from '~/models'

const urlRules = [
  (v: string) =>
    (v || '').includes('%s') || 'Search word pattern (%s) not found',
]

type Props = {
  value: boolean
  editing: boolean
  form: Partial<SearchEngine>
}

export default defineComponent({
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    editing: {
      type: Boolean,
      default: false,
    },
    form: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props: Props, context: SetupContext) {
    const state = reactive<{
      dialog: boolean
      valid: boolean
      form: Partial<SearchEngine>
    }>({
      dialog: false,
      valid: false,
      form: {},
    })

    const title = computed(() => {
      return props.editing ? 'Edit Search Engine' : 'New Search Engine'
    })

    const formRef = ref<typeof VForm>()

    const handleClickCancel = () => {
      context.emit('click:cancel')
    }
    const handleClickSave = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!(formRef.value as any).validate()) {
        return
      }
      context.emit('click:save', { ...state.form })
    }
    const handleClickConfirm = () => {
      state.dialog = true
    }
    const handleClickCancelConfirm = () => {
      state.dialog = false
    }
    const handleClickSubmit = () => {
      state.dialog = false
      context.emit('click:delete', { ...state.form })
    }

    watch(
      () => props.value,
      (value) => {
        if (value) {
          state.form = {
            ...props.form,
          }
        }
      }
    )

    return {
      urlRules,
      state,
      title,
      formRef,
      handleClickCancel,
      handleClickSave,
      handleClickConfirm,
      handleClickCancelConfirm,
      handleClickSubmit,
    }
  },
})
</script>
