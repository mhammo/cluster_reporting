<template>
  <svg
    class="map_region"
    :width="width"
    :height="height"
    :style="`min-width: ${width}; height: ${height}`"
  >
    <path :d="coordinates" />
  </svg>
</template>

<script>
const d3geo = require('d3-geo')

export default {
  props: {
    geojson: { type: Object, required: true, default: () => null },
    width: { type: Number, default: () => 300 },
    height: { type: Number, default: () => 300 },
    bounds: { type: Array, required: true, default: () => null }
  },
  computed: {
    center() {
      return [
        (this.bounds[0] + this.bounds[2]) / 2,
        (this.bounds[1] + this.bounds[3]) / 2
      ]
    },
    coordinates() {
      const projection = d3geo
        .geoMercator()
        .scale(1)
        .translate([0, 0])

      const path = d3geo.geoPath().projection(projection)
      var b = path.bounds(this.geojson),
        s =
          0.85 /
          Math.max(
            (b[1][0] - b[0][0]) / this.width,
            (b[1][1] - b[0][1]) / this.height
          ),
        t = [
          (this.width - s * (b[1][0] + b[0][0])) / 2,
          (this.height - s * (b[1][1] + b[0][1])) / 2
        ]

      projection.scale(s).translate(t)

      return path(this.geojson)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

.map_region {
  background: $color-background-contrast;

  path {
    fill: $color-background-primary;
  }
}
</style>
