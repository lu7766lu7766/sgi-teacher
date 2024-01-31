<template>
  <div v-if="!initData.isConvert">
    <div id="container" class="relative">
      <BG0 />
    </div>
    <div class="flex justify-center">
      <button type="button" class="bg-gray-400 text-white px-4 py-2 rounded mr-4" @click="exportImage">Export</button>
      <button type="button" class="bg-gray-400 text-white px-4 py-2 rounded" @click="convert2Image">ToImage</button>
    </div>
  </div>
  <div v-else>
    <img :src="initData.base64img" />
    <div class="text-center">請右鍵或長按另存圖片</div>
    <div class="flex justify-center">
      <button type="button" class="bg-gray-400 text-white px-4 py-2 rounded mr-4" @click="() => (initData.isConvert = false)">Back</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import html2canvas from "html2canvas"
import BG0 from "./components/BG0.vue"
//
const initData = reactive({
  base64img: "",
  isConvert: false,
})

const convert2base64 = (elem: HTMLElement): Promise<string> => {
  return new Promise((resolve) => {
    html2canvas(elem, { useCORS: true }).then((canvas: any) => {
      const base64 = canvas.toDataURL().replace(/^data:image\/(png|jpg);base64,/, "")
      resolve(`data:image/png;base64,${base64}`)
    })
  })
}

const convert2Image = async () => {
  initData.base64img = await convert2base64(document.getElementById("container") as HTMLElement)
  initData.isConvert = true
}

const exportImage = async () => {
  const base64img = await convert2base64(document.getElementById("container") as HTMLElement)
  downloadBase64(base64img, "sgi-teacher.png")
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

<style scoped lang="sass">

.input-area
  @apply bg-[#00000000] border-0
</style>
