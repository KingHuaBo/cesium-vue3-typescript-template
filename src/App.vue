<template>
  <div id="cesiumContainer"></div>
</template>

<script lang="ts">
(window as any).CESIUM_BASE_URL = '/Cesium/';
import { defineComponent } from "vue";
import "cesium/Build/Cesium/Widgets/widgets.css";

import * as Cesium from "cesium";

export default defineComponent({
  // type inference enabled
  props: {
    name: String,
    id: [Number, String],
    msg: { type: String, required: true },
    metadata: null
  },
  mounted() {
    let viewer=new Cesium.CesiumWidget("cesiumContainer");
    // let entity=new Cesium.Entity();
  }
});
</script>

<style lang="scss">
#app {

}
html,body{
  height: 100%;
  margin: 0 auto;
}
#cesiumContainer{
}
</style>
