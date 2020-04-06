<template>
  <div v-if="selected && selected.feature.properties.value" class="map_info">
    <div class="map_info__header">
      {{ selected ? selected.feature.properties.NUTS_NAME : '' }}
    </div>
    <div class="map_info__body">
      <h5 class="map_info__category">
        Category Type: {{ regionalMetrics[category] }}
      </h5>
      <span class="map_info__value">{{
        selected &&
          selected.feature.properties.value &&
          numberWithCommas(selected.feature.properties.value)
      }}</span>
      <b-btn :to="url" class="map_info__button" variant="primary"
        >Dashboard</b-btn
      >
    </div>
  </div>
</template>

<script>
import { numberWithCommas } from '../../utils/formatters'
import { regionalMetrics } from '../../enums/regionalMetrics'

export default {
  props: {
    selected: { type: Object, default: null },
    category: { type: String, default: 'employment' }
  },
  data() {
    return { regionalMetrics }
  },
  computed: {
    url() {
      return (
        this.selected &&
        this.selected.feature.properties.NUTS_ID &&
        '/region/' + this.selected.feature.properties.NUTS_ID
      )
    }
  },
  methods: {
    numberWithCommas
  }
}
</script>

<style lang="scss" scoped>
.map_info {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  background: white;
}

.map_info__header {
  height: 2rem;
  font-size: 0.8rem;
  padding: 0.4rem;
  text-align: center;
  display: block;
  text-transform: uppercase;
  background: #222;
  color: white;
}

.map_info__body {
  flex: 1 1 auto;
  background: white;
  display: flex;
  flex-direction: column;
  align-content: center;
  padding: 1rem 1rem 1.5rem 1rem;
  text-align: center;
}

.map_info__category {
  text-transform: uppercase;
  font-size: 0.9rem;
}

.map_info__value {
  text-transform: uppercase;
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1.2rem;
}

.map_info__button {
  width: 70%;
  margin-left: 15%;
}
</style>
