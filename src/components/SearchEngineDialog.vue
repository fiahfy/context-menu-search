<template>
  <v-dialog v-model="value" max-width="480" lazy>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card>
        <v-card-title primary-title>
          <span class="title" v-text="title" />
        </v-card-title>
        <v-card-text>
          <v-layout column>
            <v-text-field
              v-model="form.name"
              label="Name"
              placeholder="Bing"
              required
            />
            <v-text-field
              v-model="form.url"
              :rules="[urlformat]"
              label="Query URL"
              placeholder="https://www.bing.com/search?q=%s"
              hint="%s=search word"
              required
            />
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click.native="onCloseClick">Cancel</v-btn>
          <v-btn color="primary" flat @click.native="onSaveClick">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    item: {
      type: Object,
      default: () => {}
    },
    title: {
      type: String,
      default: 'Add Search Engine'
    }
  },
  data() {
    return {
      urlformat: (v) =>
        (v || '').includes('%s') || 'Search word pattern (%s) not found',
      valid: false,
      form: {}
    }
  },
  watch: {
    value(value) {
      if (value) {
        this.form = { ...this.item }
      }
    }
  },
  methods: {
    onCloseClick() {
      this.$emit('update:item', null)
      this.$emit('input', false)
    },
    onSaveClick() {
      if (!this.$refs.form.validate()) {
        return
      }
      this.$emit('update:item', this.form)
      this.$emit('input', false)
    }
  }
}
</script>
