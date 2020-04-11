<template>
  <div :class="`chart_card ${tall ? 'chart_card--tall' : ''}`">
    <h4>{{ title }}</h4>
    <hr />
    <div class="chart_card__body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: 'Untitled' },
    tall: { type: Boolean, default: false }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/variables';

.chart_card {
  background: $color-secondary;
  height: 400px;
  margin: 20px 0;
  border-radius: 1rem;
  padding: 30px;

  .chart_card__body {
    height: 300px;
    overflow-y: auto;
  }

  hr {
    border: none;
    border-top: 1px solid black;
  }

  h4 {
    font-size: 1.1rem;
    text-transform: uppercase;
  }

  &.chart_card--tall {
    height: 840px;

    .chart_card__body {
      height: 740px;
    }
  }
}
</style>
