<template>
<v-app>
    <v-content>
        <v-container fill-height fluid>
            <v-layout row wrap>
                <v-flex xs4>

                </v-flex>
                <v-flex xs8>
                    <div style="height: 100%; width: 100%">
                        <div class="info" style="height: 15%">
                            <span>Center: {{ center }}</span>
                            <span>Zoom: {{ zoom }}</span>
                            <span>Bounds: {{ bounds }}</span>
                        </div>
                        <LMap style="height: 80%; width: 100%" :zoom="zoom" :center="center" @update:zoom="zoomUpdated" @update:center="centerUpdated" @update:bounds="boundsUpdated">
                            <LCircleMarker :lat-lng="circle.center" :radius="circle.radius" :color="circle.color"></LCircleMarker>
                            <LTileLayer :url="url"></LTileLayer>
                        </LMap>
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</v-app>
</template>

<script>
import {
    LMap,
    LTileLayer,
    LCircleMarker
} from "vue2-leaflet";

export default {
    components: {
        LMap,
        LTileLayer,
        LCircleMarker
    },
    data() {
        return {
            url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
            zoom: 10,
            center: [-9.096715, -76.583411],
            bounds: null,
            circle: {
                center: [-9.096715, -76.583411],
                radius: 3,
                color: 'blue'
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
