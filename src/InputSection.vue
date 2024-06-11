<template>
  <div v-show="!isDone">
    <div id="container" class="relative">
      <initData.currentComponent />
    </div>
    <div class="flex justify-center mt-5">
      <button type="button" class="bg-teal-600 text-white px-4 py-2 rounded" @click="convert2Image">轉成圖片</button>
    </div>
  </div>
  <div v-show="isDone">
    <img :src="initData.base64img" />
    <div class="text-center mt-4">轉換完成！請點右鍵或長按螢幕後<br />選擇「另存圖片」</div>
    <div class="flex justify-center">
      <button type="button" class="bg-green-600 text-white px-4 py-2 rounded mr-4" @click="setDone(false)">回上一步，繼續編輯</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, defineAsyncComponent, nextTick } from "vue"
import html2canvas from "html2canvas"
import { useStore } from "@/store"
import { storeToRefs } from "pinia"

const store = useStore()
const { isDone } = storeToRefs(store)
const { setConverting, setDone } = store
//
const initData = reactive({
  base64img: "",
  currentComponent: defineAsyncComponent(() => import("./components/Bg02.vue")),
})

const convert2base64 = (elem: HTMLElement): Promise<string> => {
  return new Promise(async (resolve) => {
    setConverting(true)
    await nextTick()
    html2canvas(elem, { useCORS: true }).then((canvas: any) => {
      const base64 = canvas.toDataURL().replace(/^data:image\/(png|jpg);base64,/, "")
      setConverting(false)
      setDone(true)
      resolve(`data:image/png;base64,${base64}`)
    })
  })
}

const convert2Image = async () => {
  initData.base64img = await convert2base64(document.getElementById("container") as HTMLElement)
}
</script>
