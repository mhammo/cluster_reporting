<template>
  <div class="sidebar">
    <div class="sidebar_content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '~assets/scss/variables';

$sidebar-padding: 30px;

.sidebar_content {
  position: sticky;
  width: 100%;
  top: 0;
  margin-top: -$nav-height - $sidebar-padding;
  padding-top: $nav-height + $sidebar-padding;
}

.sidebar {
  flex: 350px 0 auto;
  min-width: 350px;
  width: 350px;
  min-height: 100%;
  background: $color-contrast;
  color: white;
  padding: $sidebar-padding $sidebar-padding $sidebar-padding
    ($sidebar-padding * 1.5);

  h6 {
    font-weight: normal;
    line-height: 1.8rem;
  }

  hr {
    border: none;
    border-top: 1px solid white;
    margin-bottom: 30px;
  }
}
</style>
