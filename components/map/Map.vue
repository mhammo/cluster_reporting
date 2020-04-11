<template>
  <div class="map_container">
    <div class="map_wrap">
      <l-map ref="regionMap" :options="options">
        <l-tile-layer
          :options="{ maxZoom: 6, minZoom: 3 }"
          url="https://api.mapbox.com/styles/v1/markhammond/ck8ht2tf50aoy1iny4ixo8068/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWFya2hhbW1vbmQiLCJhIjoiY2prbnRiZWZnMmllODNwbXp5YXR5NWxxbyJ9.1a4LPkQiu-lbEP4dtC7xUA"
        ></l-tile-layer>
        <choropleth-layer
          v-bind="{
            regionType,
            category,
            year,
            regionData
          }"
          @hover="setHovered"
        />
      </l-map>
      <map-zoom-buttons
        v-if="showFilters"
        @zoom-in="zoomIn"
        @zoom-out="zoomOut"
      />
    </div>
    <map-overlay
      v-if="showFilters"
      v-bind="{ regionType, selected: currentTarget, category, regionData }"
      @change-region-type="changeRegionType"
      @change-category="changeCategory"
      @change-year="changeYear"
    />
  </div>
</template>

<script>
import 'core-js/es7/object'
import ChoroplethLayer from './ChoroplethLayer'
import MapOverlay from './MapOverlay'
import MapZoomButtons from './MapZoomButtons'

export default {
  components: { MapOverlay, MapZoomButtons, ChoroplethLayer },
  props: {
    showFilters: { type: Boolean, default: true },
    regionData: { type: Array, default: () => [] },
    regionType: { type: Number, default: 1 },
    year: { type: Number, default: 2020 },
    category: { type: String, default: 'employment ' },
    options: { type: Object, default: () => {} },
    bounds: { type: Array, default: () => [] }
  },
  data() {
    return {
      geoLayer: null,
      legend: null,
      currentTarget: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.bounds.length > 0)
        this.$refs.regionMap.mapObject.fitBounds(this.bounds)
    })
  },
  updated() {
    this.$nextTick(() => {
      if (this.bounds.length > 0)
        this.$refs.regionMap.mapObject.fitBounds(this.bounds)
    })
  },
  methods: {
    changeCategory(val) {
      this.currentTarget = null
      this.$emit('change-category', val)
    },
    changeRegionType(type) {
      this.currentTarget = null
      this.$emit('change-region-type', type)
    },
    changeYear(yearValue) {
      this.currentTarget = null
      this.$emit('change-year', yearValue)
    },
    setHovered(hovered) {
      this.currentTarget = hovered
    },
    zoomIn() {
      const map = this.$refs.regionMap.mapObject
      map.setZoom(map.getZoom() + 1)
    },
    zoomOut() {
      const map = this.$refs.regionMap.mapObject
      map.setZoom(map.getZoom() - 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.map_container {
  display: flex;
  flex: 1 0 auto;
  position: relative;
  width: 100%;
}
.map_wrap {
  min-height: 100%;
  width: 100%;
  z-index: 1001;
}
</style>
