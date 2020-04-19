<template>
  <div :class="classList">
    <div class="loader__wrapper">
      <div class="loader__inner" />
      <div class="loader__text">LOADING</div>
    </div>
  </div>
</template>

<script>
import classNames from 'classnames'

export default {
  props: {
    spinning: { type: Boolean, default: false },
    fullScreen: { type: Boolean, default: false }
  },
  computed: {
    classList() {
      return classNames('loader', {
        'loader--hidden': !this.spinning,
        'loader--fullScreen': this.fullScreen
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/variables';
.loader {
  background-color: $color-background-primary;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1018;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  text-align: center;
  //display: none;

  &.loader--fullScreen {
    position: fixed;
    z-index: 1019;
  }

  .loader__wrapper {
    width: 100px;
    height: 100px;
    display: inline-flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .loader__inner {
    width: 40px;
    height: 40px;
    margin: 0 auto;
    text-indent: -12345px;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    border-right: 1px solid rgba(0, 0, 0, 0.08);
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    border-left: 1px solid rgba(0, 143, 251, 0.85);
    border-radius: 50%;
    z-index: 100001;
    animation: spinner 600ms infinite linear;
  }

  .loader__text {
    width: 100px;
    height: 20px;
    text-align: center;
    font-size: 12px;
    letter-spacing: 4px;
    color: #000;
  }

  &.loader--hidden {
    z-index: -1;
    opacity: 0;
    transition: opacity 1s ease 0.5s, z-index 0.1s ease 1.5s;
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
