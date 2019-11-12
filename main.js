import Vue from 'vue'
import App from './App'
import store from './store/';
import BurtReward from '@/components/burt-reward/index';

Vue.component('BurtReward',BurtReward);
Vue.config.productionTip = false;

Vue.prototype.$store = store;


// 挂载url
Vue.prototype.serverUrl = "http://134.175.204.38:66";
Vue.prototype.userId = "1";

App.mpType = 'app';

const app = new Vue({
    ...App,
    store
});
app.$mount();
