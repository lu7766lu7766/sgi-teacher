import { createRouter, createWebHashHistory } from "vue-router"

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/app",
      component: () => import("./InputSection.vue"),
    },
    {
      path: "/",
      component: () => import("./WorkReport/index.vue"),
    },
  ],
})
