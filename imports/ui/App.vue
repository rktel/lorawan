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
                  <LTileLayer :url="url"></LTileLayer>
                  <template v-if="data.length>0">
                    <LCircleMarker
                      v-for="item in data"
                      :key="item._id"
                      :lat-lng="[item.latitud, item.longitud]"
                      :radius="circle.radius"
                      :color="circle.color"
                    >
                      <LPopup>{{localTime(item.datetime)}} -{{item.place}}</LPopup>
                    </LCircleMarker>
                  </template>
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
import { LMap, LTileLayer, LCircleMarker, LPopup } from "vue2-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LCircleMarker,
    LPopup
  },
  data() {
    return {
      data: [],
      inputDate: initDate(),
      //url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      // url: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png",
      url:
        "https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png",
      zoom: 8,
      center: [-12.156054, -76.976268],
      bounds: null,
      circle: {
        center: [-12.156054, -76.976268],
        radius: 3,
        color: "blue"
      }
    };
  },
  methods: {
    localTime(data) {
      let dt = new Date(data.trim());
      dt.setHours(dt.getHours() - 10);
      return dt.toISOString();
    },
    getData() {
      console.log(this.inputDate);
      Meteor.call("getData", this.inputDate, (error, data) => {
        if (!error) {
          console.log("data: ", data);
          this.data = data;
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
/*
function localTime(data) {
    let dt = new Date(data);
     dt.setHours(dt.getHours() - 5);
     return dt.toISOString()
}
*/
</script>
