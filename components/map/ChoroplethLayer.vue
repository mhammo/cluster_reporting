<template>
  <div />
</template>

<script>
import {
  createColorFunction,
  createStyleFunction,
  getGradientLevels,
  topoToGeoJson,
  addRegionalDataToGeometries,
  extractAggregates,
  findRealParent
} from '../../utils/mapUtils'

export default {
  props: {
    category: { type: String, default: 'employment' },
    year: { type: Number, default: 2020 },
    regionType: { type: Number, default: 1 },
    regionData: { type: Array, default: null }
  },
  data() {
    return {
      mapObject: null,
      selected: null,
      currentTarget: null,
      regionalTopo: null,
      nationalTopo: null
    }
  },
  watch: {
    category() {
      this.renderChoropleth()
    },
    year() {
      this.renderChoropleth()
    },
    regionType() {
      this.renderChoropleth()
    },
    regionData() {
      this.renderChoropleth()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.mapObject = findRealParent(this.$parent).mapObject
      this.renderChoropleth()
    })
  },
  methods: {
    highlightFeature(e) {
      if (this.selected && this.selected !== e) return

      if (this.currentTarget) this.resetHighlight(this.currentTarget)
      this.currentTarget = e.target
      this.$emit('hover', e.target)

      this.currentTarget.setStyle({
        weight: 2,
        color: '#111',
        opacity: 1,
        fillOpacity: 1
      })

      if (
        !this.$L.Browser.ie &&
        !this.$L.Browser.opera &&
        !this.$L.Browser.edge
      ) {
        this.currentTarget.bringToFront()
      }
    },
    zoomToFeature(e) {
      this.mapObject.fitBounds(e.target.getBounds())
      this.selected = e
      this.$emit('selected', e.target)
      this.highlightFeature(e)
    },
    onEachFeature(feature, layer) {
      layer.on({
        mouseover: this.highlightFeature,
        click: this.zoomToFeature
      })
    },
    resetHighlight(target) {
      this.geoLayer.resetStyle(target)
    },
    getTopoJson(cb) {
      if (this.regionType === 1) {
        if (!this.regionalTopo)
          this.$axios
            .get('NUTS_RG_10M_2016_4326_LEVL_2.json')
            .then((resp) => {
              this.regionalTopo = resp.data
              cb(resp.data)
            })
            .catch((err) => console.error(err))
        else cb(this.regionalTopo)
      } else if (this.regionType === 2) {
        if (!this.nationalTopo)
          this.$axios
            .get('NUTS_RG_10M_2016_4326_LEVL_0.json')
            .then((resp) => {
              this.nationalTopo = resp.data
              cb(resp.data)
            })
            .catch((err) => console.error(err))
        else cb(this.nationalTopo)
      }
    },
    renderChoropleth() {
      this.selected = null
      const map = this.mapObject
      if (!this.regionData) {
        if (this.geoLayer) map.removeLayer(this.geoLayer)
        return
      }

      this.getTopoJson((topo) => {
        const key = this.category
        const figures = this.regionData
          .map((x) => x[key])
          .filter((x) => !isNaN(x))
        const { min, max, sum, count } = extractAggregates(figures)
        const mean = sum / count
        const gradientLevels = getGradientLevels(mean, min, max)
        const getColor = createColorFunction(gradientLevels)
        const style = createStyleFunction(getColor, key)

        addRegionalDataToGeometries(
          topo.objects.NUTS_RG_10M_2016_4326.geometries,
          this.regionData,
          key
        )

        const geojson = topoToGeoJson(topo)
        if (this.geoLayer) map.removeLayer(this.geoLayer)
        this.geoLayer = this.$L
          .geoJson(geojson, {
            style,
            onEachFeature: this.onEachFeature
          })
          .addTo(map)
      })
    }
  }
}
</script>
