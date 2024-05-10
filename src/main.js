import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'tailwindcss/tailwind.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'ant-design-vue/dist/reset.css';
import { plugin as formKitPlugin, defaultConfig } from '@formkit/vue'
import { createFloatingLabelsPlugin } from '@formkit/addons'
import '@formkit/themes/genesis'
import '@formkit/addons/css/floatingLabels'


createApp(App).use(router).use(store).use(formKitPlugin, defaultConfig({
    plugins: [createFloatingLabelsPlugin({
        useAsDefault: true
    })]
})).mount('#app');
