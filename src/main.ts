import { createApp } from "vue";
import { createPinia } from "pinia";
import Antd from "ant-design-vue";
import App from "@/App.vue";
import router from "@/router";
import { globalAxios } from "@/request";
import piniaPluginPersist from "pinia-plugin-persist";
// import "@/style/index.less";
import "@/style/reset.less";
// @import './common.less';
import "ant-design-vue/dist/antd.less";

const app = createApp(App);

const store = createPinia();
store.use(piniaPluginPersist);
app.use(store);

app.use(router);
app.use(Antd);
app.use(globalAxios);

router.isReady().then(() => app.mount("#app"));
