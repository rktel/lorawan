<template>
  <v-app>
    <v-content>
      <v-container fill-height fluid>
        <v-layout row wrap>
          <v-flex xs3>
            <v-card style="height: 100%; width: 100%" class="px-3">
              <v-layout column>
                <input type="date" v-model="inputDate">
                <v-btn color="success" @click="getData">Buscar</v-btn>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex xs9>
            <v-card style="height: 100%; width: 100%">
              <div style="height: 100%; width: 100%">
                <div class="grey" style="height: 10%">
                  <span>Center: {{ center }}</span>
                  <span>Zoom: {{ zoom }}</span>
                  <span>Bounds: {{ bounds }}</span>
                </div>
                <LMap
                  style="height: 90%; width: 100%"
                  :zoom="zoom"
                  :center="center"
                  @update:zoom="zoomUpdated"
                  @update:center="centerUpdated"
                  @update:bounds="boundsUpdated"
                >
                  <LCircleMarker
                    :lat-lng="circle.center"
                    :radius="circle.radius"
                    :color="circle.color"
                  ></LCircleMarker>
                  <LTileLayer :url="url"></LTileLayer>
                </LMap>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { LMap, LTileLayer, LCircleMarker } from "vue2-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LCircleMarker
  },
  data() {
    return {
      inputDate: initDate(),
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 10,
      center: [-9.096715, -76.583411],
      bounds: null,
      circle: {
        center: [-9.096715, -76.583411],
        radius: 3,
        color: "blue"
      }
    };
  },
  methods: {
    getData() {
      console.log(this.inputDate);
      Meteor.call('getData', this.inputDate, (error, data) =>{ 
        if (!error) { 
          console.log('data: ', data); 
        } 
      });
    },
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
    }
  }
};

/* funciones de apoyo*/

function initDate() {
  let dt = new Date();
  dt.setHours(dt.getHours() - 5);
  return dt.toISOString().split("T")[0];
}
</script>
