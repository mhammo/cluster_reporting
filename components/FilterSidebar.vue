<template>
  <div :class="`sidebar ${classModifiers}`">
    <div class="sidebar_wrapper">
      <div class="sidebar__close" v-show="mobile">
        <button class="btn btn--close" @click="$emit('toggle', null)">
          <close />
        </button>
      </div>
      <div v-if="title" class="sidebar_header">
        <h6>{{ title }}</h6>
      </div>
      <div class="sidebar_content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import Close from 'vue-material-design-icons/Close.vue'

export default {
  components: {
    Close
  },
  props: {
    title: { type: String },
    open: { type: Boolean, default: false },
    mobile: { type: Boolean, default: false }
  },
  computed: {
    classModifiers() {
      return (
        (this.mobile ? ' sidebar--mobile' : '') +
        (this.mobile && this.open ? ' sidebar--open' : '')
      )
    }
  }
}
</script>

<style lang="scss">
@import '~assets/scss/variables';

$sidebar-padding: 30px;
$sidebar-width: 350px;

.sidebar_wrapper {
  position: sticky;
  width: 100%;
  top: 0;
  margin-top: -$nav-height - 45;
  padding-top: $nav-height + 45;
}

.sidebar_header {
  background: $color-background-dark;
  padding: $sidebar-padding;
}

.sidebar_content {
  padding: $sidebar-padding;
}

.sidebar {
  @include color-contrast;

  flex: $sidebar-width 0 auto;
  min-width: $sidebar-width;
  width: $sidebar-width;
  min-height: 100%;

  h6 {
    font-weight: normal;
    line-height: 1.8rem;
  }

  hr {
    border: none;
    border-top: 1px solid white;
    margin-bottom: 30px;
  }

  .sidebar__close {
    display: flex;
    flex-direction: row-reverse;
  }

  .btn--close {
    font-size: 1.3rem;
    padding: 0.3rem;
    margin-left: auto;
    margin-right: 0;
    border-radius: 0;
  }

  &.sidebar--mobile {
    position: fixed;
    top: 0;
    margin-left: -$sidebar-width;
    z-index: 1030;
    transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

    .sidebar_wrapper {
      position: relative;
      margin-top: 0;
      padding-top: 0;
    }

    &.sidebar--open {
      margin-left: 0;
    }
  }
}
</style>
