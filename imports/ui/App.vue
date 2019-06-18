<template>
  <div style="height: 100%; width: 100%">
    <div class="info" style="height: 15%">
      <span>Center: {{ center }}</span>
      <span>Zoom: {{ zoom }}</span>
      <span>Bounds: {{ bounds }}</span>
    </div>
    <LMap
      style="height: 80%; width: 100%"
      :zoom="zoom"
      :center="center"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
    >
      <LCircle :lat-lng="circle.center" :radius="circle.radius" :color="circle.color"></LCircle>
      <LTileLayer :url="url"></LTileLayer>
    </LMap>
  </div>
</template>

<script>
import { LMap, LTileLayer, LCircle } from "vue2-leaflet";

export default {
  components: { LMap, LTileLayer, LCircle },
  data() {
    return {
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 3,
      center: [-9.096715, -76.583411],
      bounds: null,
      circle: {
        center: [-9.096715, -76.583411],
        radius: 6,
        color: "red"
      }
    };
  },
  methods: {
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
</script>
