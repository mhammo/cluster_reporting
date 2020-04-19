<template>
  <div v-if="regionData && regionData.length > 0" class="map_legend">
    <div class="map_legend_colors">
      <span
        v-for="item in gradientColors"
        :key="item"
        :style="{ background: item }"
        class="map_legend__color"
      ></span>
    </div>
    <div class="map_legend__labels">
      <span class="map_legend__label">{{ min }}</span>
      <span class="map_legend__label">{{ max }}</span>
    </div>
  </div>
</template>

<script>
import { extractAggregates, getGradientLevels } from '~/utils/mapUtils'
import { gradientColors } from '~/utils/colors'
import { kFormatter } from '~/utils/formatters'
export default {
  props: {
    regionData: { type: Array, default: null }
  },
  data() {
    return {
      gradientColors,
      min: 0,
      max: 100
    }
  },
  watch: {
    regionData() {
      this.getAggregates()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getAggregates()
    })
  },
  methods: {
    getAggregates() {
      if (!this.regionData) return
      const aggregates = extractAggregates(this.regionData)
      const levels = getGradientLevels(
        aggregates.sum / aggregates.count,
        aggregates.min,
        aggregates.max
      )
      this.min = kFormatter(Math.round(levels[5]))
      this.max = kFormatter(Math.round(levels[0]))
    }
  }
}
</script>

<style lang="scss" scoped>
.map_legend_colors {
  width: 100%;
  display: flex;
  margin: 3px 2px;
}

.map_legend__color {
  flex: 1 1;
  margin: 0px 1px;
  height: 20px;
  display: inline-block;
}

.map_legend {
  display: inline-block;
  background: white;
  padding: 10px;
  width: 350px;
  border: solid #232323 1px;
  border-radius: 0.2rem;
}

.map_legend__labels {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  font-weight: 600;
}
</style>
