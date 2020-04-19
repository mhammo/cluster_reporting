<template>
  <div :style="`height: ${height}px;`" class="chart_card">
    <h4>{{ title }}</h4>
    <hr />
    <div :style="`height: ${cardBodyHeight}px;`" class="chart_card__body">
      <Loader :spinning="loading" class="chart_card__loader" />
      <slot />
    </div>
  </div>
</template>

<script>
import Loader from './Loader'

export default {
  components: {
    Loader
  },
  props: {
    title: { type: String, default: 'Untitled' },
    height: { type: Number, default: 440 },
    loading: { type: Boolean, default: false }
  },
  computed: {
    cardBodyHeight() {
      return this.height - 100
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/variables';

.chart_card {
  .chart_card__loader {
    background: $color-background-secondary;
  }
}

.chart_card {
  background: $color-background-secondary;
  margin: 20px 0;
  padding: 30px;
  border-top: 2px solid $color-primary;

  .chart_card__body {
    overflow-x: hidden;
    overflow-y: auto;
  }

  h4 {
    font-size: 1.1rem;
    text-transform: uppercase;
  }

  &.chart_card--long {
    max-width: 1350px;

    .chart_card__body {
      display: flex;
      flex-direction: row;
      overflow-y: hidden;
    }
  }
}
</style>
