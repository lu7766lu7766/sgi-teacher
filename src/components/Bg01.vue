<template>
  <img src="/bg_01.jpg" class="w-full" />
  <textarea class="input-area absolute left-[2vw] top-[46vw] w-[43vw] h-[35vw]" placeholder="點我開始輸入" v-model="initData.note1"></textarea>
  <textarea class="input-area absolute left-[52vw] top-[57vw] w-[48vw] h-[33vw]" placeholder="點我開始輸入" v-model="initData.note2"></textarea>
  <textarea class="input-area absolute left-[2vw] top-[96vw] w-[38vw] h-[43vw]" placeholder="點我開始輸入" v-model="initData.note3"></textarea>
  <textarea class="input-area absolute left-[47vw] top-[104vw] w-[52vw] h-[36vw]" placeholder="點我開始輸入" v-model="initData.note4"></textarea>
</template>

<script setup>
import { reactive } from "vue"
const initData = reactive({
  note1: "",
  note2: "",
  note3: "",
  note4: "",
})
</script>
