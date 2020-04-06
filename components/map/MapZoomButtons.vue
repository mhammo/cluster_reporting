<template>
  <div class="map_zoom_buttons">
    <a
      href="#"
      class="btn btm-small map_zoom_button"
      title="Zoom out"
      aria-label="Zoom out"
      role="button"
      @click="$emit('zoom-out', null)"
    >
      -
    </a>
    <a
      href="#"
      class="btn btm-small map_zoom_button"
      titl="Zoom in"
      aria-label="Zoom in"
      role="button"
      @click="$emit('zoom-in', null)"
    >
      +
    </a>
  </div>
</template>

<style lang="scss" scoped>
@import '../../assets/scss/variables';
$zoom-button-size: 2rem;

.map_zoom_buttons {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1003;
  margin: 0 20px 20px 0;
}

.map_zoom_button {
  background: $color-dark;
  color: white;
  padding: 0;
  width: $zoom-button-size;
  height: $zoom-button-size;
  font-size: $zoom-button-size;
  line-height: $zoom-button-size * 0.75;
  border-radius: 0.375rem;
  border: none;
}
</style>
