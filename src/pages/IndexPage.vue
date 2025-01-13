<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md">
      <q-card class="my-card" flat bordered :class="['card']">
        <form>
          <q-card-section>
            <q-input v-model="title" label="Título" class="q-mb-md full-width" />
            <q-input v-model="autor" label="Autor" class="q-mb-md full-width" />
          </q-card-section>
          <q-card-section>
            <q-editor
              v-model="editor"
              class="q-editor"
              :definitions="{
                bold: { label: 'Bold', icon: 'format_bold', tip: 'Tooltip' },
              }"
            />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn label="Salvar" class="q-mt-md" @click="onSubmit" />
            <q-btn label="Cancelar" class="q-mt-md" type="reset" />
          </q-card-actions>
        </form>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'

export default defineComponent({
  name: 'IndexPage',

  components: {},

  data() {
    return {
      title: '',
      autor: '',
      editor: '',
      isMarkdown: true,
      socket: null as Socket | null,
    }
  },
  methods: {
    onSave() {
      console.log('Saved', this.editor)
    },
    onSubmit() {
      console.log('Submitted')
      if (this.socket) {
        this.socket.emit('message', {
          title: this.title,
          autor: this.autor,
          content: this.editor,
        })
      }
      console.log(this.socket)
    },
  },
  mounted() {
    this.socket = io('http://localhost:3000')
    this.socket.on('welcome', (data) => {
      console.log(data.message)
    })
  },

  beforeUnmount() {
    if (this.socket) {
      this.socket.disconnect()
    }
  },
})
</script>
<style>
.full-width {
  width: 100%;
}
.q-editor {
  min-height: 350px;
}
.card {
  min-width: 500px;
  padding: 10px;
}
</style>
