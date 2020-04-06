<template>
  <div class="map_container">
    <div class="map_wrap">
      <l-map
        ref="regionMap"
        :options="{ zoomControl: false }"
        :zoom="4"
        :center="[55.9464418, 8.1277591]"
      >
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
      <map-zoom-buttons @zoom-in="zoomIn" @zoom-out="zoomOut" />
    </div>
    <map-overlay
      v-bind="{ regionType, selected: currentTarget, category, regionData }"
      @change-region-type="changeRegionType"
      @change-category="changeCategory"
      @change-year="changeYear"
    />
  </div>
</template>

<script>
import 'core-js/es7/object'
import gql from 'graphql-tag'
import ChoroplethLayer from './ChoroplethLayer'
import MapOverlay from './MapOverlay'
import MapZoomButtons from './MapZoomButtons'

export default {
  components: { MapOverlay, MapZoomButtons, ChoroplethLayer },
  data() {
    return {
      regionType: 1,
      year: 2016,
      category: 'employment',
      geoLayer: null,
      legend: null,
      currentTarget: null,
      regionData: []
    }
  },
  apollo: {
    // Simple query that will update the 'hello' vue property
    regionalMetrics: {
      query() {
        return gql`
        query RegionalStatistics($year: Int!, $regionType: Int!) {
          getRegionalStatistics(yr: $year, regionType: $regionType) {
            edges {
              node {
                regionCode
                ${this.category}
              }
            }
          }
        }
      `
      },
      variables() {
        return {
          year: this.year,
          regionType: this.regionType
        }
      },
      update: (data) => data.getRegionalStatistics.edges,
      result(key) {
        if (!key.loading)
          this.regionData = key.data.getRegionalStatistics.edges.map((x) => {
            const r = x
            r.node[this.category] = parseInt(x.node[this.category])
            return r
          })
      }
    }
  },
  methods: {
    changeRegionType(type) {
      this.currentTarget = null
      this.regionType = type
    },
    changeCategory(metric) {
      this.currentTarget = null
      this.category = metric
    },
    changeYear(yearValue) {
      this.currentTarget = null
      this.year = yearValue
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
