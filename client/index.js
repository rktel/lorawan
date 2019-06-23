import Vue from 'vue';

// VueMeteorTracker
import VueMeteorTracker from 'vue-meteor-tracker';   // here!
Vue.use(VueMeteorTracker);                           // here!
// Vuetify CSS
import Vuetify from 'vuetify'
Vue.use(Vuetify)
import 'vuetify/dist/vuetify.min.css'

// add App.vue
import App from '../imports/ui/App.vue';
// Quitamos mensaje Vue Development de consola del navegador
Vue.config.productionTip = false

// Vue-Leaflet

import 'leaflet/dist/leaflet.css'



Meteor.startup(() => {
  new Vue({
    el: '#app',
    ...App,
  });
});