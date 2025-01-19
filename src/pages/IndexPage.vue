<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md">
      <q-card>
        <q-card-section>
          <q-card-title class="text-h6">Adicione um resumo</q-card-title>
        </q-card-section>
        <q-card-section>
          <q-btn label="Adicionar" color="primary" @click="toggleDialog" />
        </q-card-section>
      </q-card>
      <q-dialog v-model="showDialog" persistent>
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
              <q-btn label="Cancelar" class="q-mt-md" type="reset" @click="onCancel" />
            </q-card-actions>
          </form>
        </q-card>
      </q-dialog>
      <q-infinite-scroll class="q-mt-md bg-black">
        <q-card class="my-card" flat bordered :class="['card']">
          <q-card-section>
            <q-card-title class="text-h6">Resumos</q-card-title>
          </q-card-section>
          <q-card-section>
            <q-list>
              <q-item v-for="resumo in resumos" :key="resumo.id">
                <q-card class="full-width card">
                  <q-card-section>
                    <div  class="text-h6">{{ resumo.titulo }}</div>
                    <div class="text-subtitle2">by {{ resumo.autor }} </div>
                  </q-card-section>
                  <q-separator inset/>
                  <q-card-section>
                    <div>{{ resumo.conteudo }}</div>
                  </q-card-section>
                  <q-card-section>
                   
                  </q-card-section>
                </q-card>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-infinite-scroll>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'

interface Resumo{
  id: number,
  titulo: string,
  autor: string,
  conteudo: string
}

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
      showDialog: false,
      resumos: [] as Resumo [],
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
      this.toggleDialog()
    },
    onCancel() {
      this.toggleDialog()
    },
    toggleDialog() {
      this.showDialog = !this.showDialog
    },
  },
  mounted() {
    this.socket = io('https://3000-lbritors-socketredesbac-frl873gb309.ws-us117.gitpod.io', {
      transports: ['websocket'],
    })
    this.socket.on('welcome', (data) => {
      console.log(data.message)
    })
    this.socket.on('setup', (resumos: Resumo[]) => {
      console.log('resumos recebidos: ', resumos)
      this.resumos = resumos
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
  min-height: 300px;
  max-width: 700px;
}
</style>
