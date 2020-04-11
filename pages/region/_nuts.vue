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
          v-model="year"
          :options="yearOptions"
          class="form-control"
        ></b-form-select>
      </b-form-group>
    </filter-sidebar>
    <div class="dashboard-content">
      <div class="map-header">
        <a
          class="map_header__back"
          href="/"
          title="Back to map"
          aria-label="Back to map"
          ><chevron-left /> Back to map</a
        >
        <client-only>
          <Map
            v-bind="{
              showFilters: false,
              year,
              category,
              regionType,
              regionData,
              bounds,
              options: {
                zoomControl: false,
                zoom: 4,
                center: [55.9464418, 8.1277591]
              }
            }"
          />
        </client-only>
      </div>
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
        <nuxt-child v-bind="{ regionByNutsId }" />
      </div>
    </div>
  </div>
</template>

<script>
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue'
import gql from 'graphql-tag'
import PollIcon from '~/node_modules/vue-material-design-icons/Poll'
import GaugeFullIcon from '~/node_modules/vue-material-design-icons/GaugeFull'
import MapMarkerIcon from '~/node_modules/vue-material-design-icons/MapMarker'
import StarIcon from '~/node_modules/vue-material-design-icons/Star'
import FilterSidebar from '~/components/FilterSidebar.vue'
import Map from '~/components/map/Map.vue'

export default {
  components: {
    ChevronLeft,
    FilterSidebar,
    GaugeFullIcon,
    PollIcon,
    MapMarkerIcon,
    StarIcon,
    Map
  },
  data() {
    return {
      year: 2016,
      yearOptions: [
        { value: 2020, text: '2020' },
        { value: 2019, text: '2019' },
        { value: 2018, text: '2018' },
        { value: 2017, text: '2017' },
        { value: 2016, text: '2016' },
        { value: 2015, text: '2015' },
        { value: 2014, text: '2014' }
      ],
      regionData: null,
      regionType: 1,
      category: 'employment'
    }
  },
  computed: {
    bounds() {
      return (
        this.regionByNutsId && [
          [this.regionByNutsId.bounds[0], this.regionByNutsId.bounds[1]],
          [this.regionByNutsId.bounds[2], this.regionByNutsId.bounds[3]]
        ]
      )
    }
  },
  apollo: {
    // Simple query that will update the 'hello' vue property
    regionByNutsId: {
      query() {
        return gql`
          query RegionalStatistics($nuts: String!, $year: Int!, $regionType: Int!) {
            regionByNutsId(nuts: $nuts) {
              bounds
              nutsName
              countryByCountryId {
                nutsName
              }
            }
            getRegionalStatistics(yr: $year, regionType: $regionType) {
              edges {
                node {
                  regionCode
                  ${this.category}
                }
              }
            }
          }
        `
      },
      prefetch: false,
      variables() {
        return {
          nuts: this.$route.params.nuts,
          year: this.year,
          regionType: this.regionType
        }
      },
      result(key) {
        if (!key.loading && key.data && key.data.getRegionalStatistics)
          this.regionData = key.data.getRegionalStatistics.edges.map((x) => {
            const r = x
            r.node[this.category] =
              x.node.regionCode === this.$route.params.nuts ? 10000 : 1
            return r
          })
      }
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
  min-height: 400px;
  background: #ddd;
  width: 100%;
  display: flex;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1018; // put a layer over the map to make it unreactive
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), transparent 30%);
  }
}

.map_header__back {
  position: absolute;
  top: 0;
  left: 0;
  margin: 10px;
  color: white;
  z-index: 1019;
  text-transform: uppercase;
  font-size: 0.9rem;
}

.tab-pane {
  margin: 40px;
}
</style>
