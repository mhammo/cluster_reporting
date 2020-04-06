<template>
  <div class="ie-fixMinHeight">
    <div class="main">
      <Header />
      <nuxt />
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import 'vue-material-design-icons/styles.css'

export default {
  components: {
    Header
  }
}
</script>

<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.ie-fixMinHeight {
  display: flex;
}

.main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  flex: 1 1 auto;
}
</style>
