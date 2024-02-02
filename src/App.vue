<template>
  <div v-show="!isDone">
    <div id="container" class="relative">
      <initData.currentComponent />
    </div>
    <div class="flex justify-center mt-5">
      <button type="button" class="bg-blue-600 text-white px-4 py-2 rounded mr-4" @click="exportImage">下載</button>
      <button type="button" class="bg-teal-600 text-white px-4 py-2 rounded" @click="convert2Image">轉成圖片</button>
    </div>
  </div>
  <div v-show="isDone">
    <img :src="initData.base64img" />
    <div class="text-center mt-4">轉換完成，請點右鍵或長按另存圖片</div>
    <div class="flex justify-center">
      <button type="button" class="bg-green-600 text-white px-4 py-2 rounded mr-4" @click="setDone(false)">編輯</button>
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
  currentComponent: defineAsyncComponent(() => import("./components/Bg01.vue")),
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

const exportImage = async () => {
  const base64img = await convert2base64(document.getElementById("container") as HTMLElement)
  downloadBase64(base64img, "sgi-teacher.png")
  setDone(false)
}

/** 下载图片 */
const downloadBase64 = (content: string, fileName: string) => {
  var base64ToBlob = function (code: any) {
    let parts = code.split(";base64,")
    let contentType = parts[0].split(":")[1]
    let raw = window.atob(parts[1])
    let rawLength = raw.length
    let uInt8Array = new Uint8Array(rawLength)
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i)
    }
    return new Blob([uInt8Array], {
      type: contentType,
    })
  }
  let aLink = document.createElement("a")
  let blob = base64ToBlob(content)
  aLink.download = fileName + ".png"
  aLink.href = URL.createObjectURL(blob)
  aLink.click()
}
</script>
