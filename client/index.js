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
//import { Icon }  from 'leaflet'
import 'leaflet/dist/leaflet.css'


// this part resolve an issue where the markers would not appear
//delete Icon.Default.prototype._getIconUrl;

/*
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'


Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl
});

*/
Meteor.startup(() => {
  new Vue({
    el: '#app',
    ...App,
  });
});