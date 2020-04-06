<template>
  <div class="chart_card">
    <h4>{{ title }}</h4>
    <hr />
    <div class="chart_card__body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: { title: { type: String, default: 'Untitled' } }
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

  hr {
    border: none;
    border-top: 1px solid black;
  }

  h4 {
    font-size: 1.1rem;
    text-transform: uppercase;
  }
}
</style>
