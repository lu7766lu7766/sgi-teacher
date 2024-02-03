<template>
  <img src="/bg_01.jpg" class="w-full" />
  <InputArea class="left-[2vw] top-[46vw] w-[43vw] h-[35vw]" placeholder="點我開始輸入" lsKey="bg01-01" v-model="initData.note1"></InputArea>
  <InputArea class="left-[52vw] top-[57vw] w-[47vw] h-[33vw]" placeholder="點我開始輸入" lsKey="bg01-02" v-model="initData.note2"></InputArea>
  <InputArea class="left-[2vw] top-[96vw] w-[38vw] h-[43vw]" placeholder="點我開始輸入" lsKey="bg01-03" v-model="initData.note3"></InputArea>
  <InputArea class="left-[47vw] top-[104vw] w-[52vw] h-[36vw]" placeholder="點我開始輸入" lsKey="bg01-04" v-model="initData.note4"></InputArea>
</template>

<script setup>
import { reactive } from "vue"
import InputArea from "./InputArea.vue"
const initData = reactive({
  note1: "",
  note2: "",
  note3: "",
  note4: "",
})
</script>
