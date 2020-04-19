<template>
  <div class="page-content">
    <div class="mobile_nav">
      <a
        v-show="mobile"
        href="#"
        class="button--open"
        role="button"
        title="Open filter pane"
        aria-label="Open filter pane"
        @click="toggle"
      >
        <filter-outline />
      </a>
      <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
    </div>
    <div :class="`main-content${mobile ? ' main-content--mobile' : ''}`">
      <loader :spinning="$apollo.loading" :fullScreen="true" />
      <filter-sidebar
        title="Use the following filters to filter the dashboards below"
        :open="open"
        :mobile="mobile"
        @toggle="toggle"
      >
        <b-form-group
          label="Year"
          label-for="year"
          description="Select the year you would like to view data for"
        >
          <b-form-select id="year" v-model="year" :options="yearOptions" class="form-control"></b-form-select>
        </b-form-group>
        <b-form-group
          label="Metric"
          label-for="metric"
          description="Select a metric to view on the map header and dashboard"
        >
          <b-form-select id="metric" v-model="metric" :options="metricOptions" class="form-control"></b-form-select>
        </b-form-group>
      </filter-sidebar>
      <div class="dashboard-content">
        <div class="map-header">
          <client-only>
            <Map
              v-bind="{
              showFilters: false,
              year,
              category: 'employment',
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
          <b-nav-item class="active" :to="`/regions/${$route.params.nuts}`">
            <gauge-full-icon />&nbsp;Summary
          </b-nav-item>
          <b-nav-item :to="`/regions/${$route.params.nuts}/performance`">
            <poll-icon />&nbsp;Performance
          </b-nav-item>
          <b-nav-item :to="`/regions/${$route.params.nuts}/similar`">
            <map-marker-icon />&nbsp;Similar Regions
          </b-nav-item>
          <b-nav-item :to="`/regions/${$route.params.nuts}/compare`">
            <star-icon />&nbsp;Compare To
          </b-nav-item>
        </b-nav>
        <div class="dashboard-body">
          <nuxt-child v-bind="{ regionByNutsId, year, metric }" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue'
import FilterOutline from 'vue-material-design-icons/FilterOutline.vue'
import gql from 'graphql-tag'
import PollIcon from '~/node_modules/vue-material-design-icons/Poll'
import GaugeFullIcon from '~/node_modules/vue-material-design-icons/GaugeFull'
import MapMarkerIcon from '~/node_modules/vue-material-design-icons/MapMarker'
import StarIcon from '~/node_modules/vue-material-design-icons/Star'
import FilterSidebar from '~/components/FilterSidebar.vue'
import Map from '~/components/map/Map.vue'
import Loader from '~/components/Loader.vue'
import { regionalMetrics } from '~/enums/regionalMetrics'

export default {
  components: {
    ChevronLeft,
    FilterOutline,
    FilterSidebar,
    GaugeFullIcon,
    PollIcon,
    MapMarkerIcon,
    StarIcon,
    Map,
    Loader
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
      metric: 'employment',
      metricOptions: Object.keys(regionalMetrics).map((x) => ({
        value: x,
        text: regionalMetrics[x]
      })),
      open: false,
      windowWidth: 0,
      breadcrumb: [
        {
          text: 'Reporting',
          href: '/'
        },
        {
          text: 'Regions',
          href: '/regions'
        },
        {
          text: this.$route.params.nuts,
          active: true
        }
      ]
    }
  },
  computed: {
    bounds() {
      return (
        this.regionByNutsId && [
          [this.regionByNutsId.bounds[1], this.regionByNutsId.bounds[0]],
          [this.regionByNutsId.bounds[3], this.regionByNutsId.bounds[2]]
        ]
      )
    },
    mobile() {
      return this.windowWidth <= 1280
    }
  },
  apollo: {
    // Simple query that will update the 'hello' vue property
    regionByNutsId: {
      query() {
        return gql`
          query RegionalStatistics(
            $nuts: String!
            $year: Int!
            $regionType: Int!
          ) {
            regionByNutsId(nuts: $nuts) {
              bounds
              nutsName
              countryByCountryId {
                nutsName
              }
            }
            getRegionalStatistics(yr: $year, regionType: $regionType) {
              nodes {
                regionCode
                employment
              }
            }
          }
        `
      },
      prefetch: true,
      variables() {
        return {
          nuts: this.$route.params.nuts,
          year: this.year,
          regionType: this.regionType
        }
      },
      result(key) {
        if (!key.loading && key.data && key.data.getRegionalStatistics)
          this.regionData = key.data.getRegionalStatistics.nodes.map((x) => {
            const r = x
            r['employment'] =
              x.regionCode === this.$route.params.nuts ? 10000 : null
            return r
          })
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.onResize()
      window.addEventListener('resize', this.onResize)
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth
      if (!this.mobile && this.open) this.open = false
    },
    toggle() {
      this.open = !this.open
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/variables';

.page-content {
  display: flex;
  flex: 1 1 auto;
  width: 100%;
  flex-direction: column;
}

.main-content {
  display: flex;
  flex: 1 1 auto;
  width: 100%;
  background: $color-background-primary;

  &.main-content--mobile {
    margin-top: 45px;
  }
}

.breadcrumb {
  margin: 0;
  background: $color-background-primary;
}

.dashboard-content {
  flex: 1 1 auto;
}

.dashboard-body {
  margin: 40px;
  max-width: 100%;
  position: relative;
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
    z-index: 1016; // put a layer over the map to make it unreactive
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), transparent 40%);
  }
}

.map_header__back {
  position: absolute;
  top: 0;
  left: 0;
  margin: 10px;
  color: white;
  z-index: 1017;
  text-transform: uppercase;
}

.tab-pane {
  margin: 40px;
}

.mobile_nav {
  top: $nav-height;
  position: fixed;
  min-height: 48px;
  width: 100%;
  z-index: 1019;
  background: $color-background-primary;
  display: flex;
}

.button--open {
  height: 48px;
  width: 48px;
  background: map-get($theme-colors, 'primary');
  color: white;
  padding: 7px 10px 10px 10px;
  font-size: 28px;
  line-height: 33px;
  z-index: 1018;

  &:hover {
    text-decoration: none;
  }
}
</style>
