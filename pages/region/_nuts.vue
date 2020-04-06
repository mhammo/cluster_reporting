<template>
  <div class="main-content">
    <filter-sidebar>
      <h6>Use the following filters to filter the dashboards below</h6>
      <hr />
      <b-form-group
        label="Year"
        label-for="year"
        description="Select the year you would like to view data for"
      >
        <b-form-select
          id="year"
          v-model="yearValue"
          :options="yearOptions"
          class="form-control"
          @change="$emit('change-year', yearValue)"
        ></b-form-select>
      </b-form-group>
    </filter-sidebar>
    <div class="dashboard-content">
      <div class="map-header"></div>
      <b-nav class="nav-router-tabs">
        <b-nav-item class="active" :to="`/region/${$route.params.nuts}`">
          <gauge-full-icon /> Summary
        </b-nav-item>
        <b-nav-item :to="`/region/${$route.params.nuts}/performance`">
          <poll-icon /> Performance
        </b-nav-item>
        <b-nav-item :to="`/region/${$route.params.nuts}/similar`">
          <map-marker-icon /> Similar Regions
        </b-nav-item>
        <b-nav-item :to="`/region/${$route.params.nuts}/compare`">
          <star-icon /> Compare To
        </b-nav-item>
      </b-nav>
      <div class="dashboard-body">
        <nuxt-child />
      </div>
    </div>
  </div>
</template>

<script>
import PollIcon from '~/node_modules/vue-material-design-icons/Poll'
import GaugeFullIcon from '~/node_modules/vue-material-design-icons/GaugeFull'
import MapMarkerIcon from '~/node_modules/vue-material-design-icons/MapMarker'
import StarIcon from '~/node_modules/vue-material-design-icons/Star'
import FilterSidebar from '~/components/FilterSidebar.vue'

export default {
  components: {
    FilterSidebar,
    GaugeFullIcon,
    PollIcon,
    MapMarkerIcon,
    StarIcon
  },
  data() {
    return {
      yearValue: this.year,
      yearOptions: [
        { value: 2020, text: '2020' },
        { value: 2019, text: '2019' },
        { value: 2018, text: '2018' },
        { value: 2017, text: '2017' },
        { value: 2016, text: '2016' },
        { value: 2015, text: '2015' },
        { value: 2014, text: '2014' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.main-content {
  display: flex;
  flex: 1 1 auto;
  position: relative;
  width: 100%;
}

.dashboard-content {
  flex: 1 1 auto;
  overflow-y: auto;
}

.dashboard-body {
  margin: 40px;
  max-width: 100%;
}

.map-header {
  height: 400px;
  background: #ddd;
  width: 100%;
}

.tab-pane {
  margin: 40px;
}
</style>
