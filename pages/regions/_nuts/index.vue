<template>
  <div v-if="regionByNutsId">
    <h6 class="header--location">
      <map-marker-icon />
      {{
      `${regionByNutsId.countryByCountryId.nutsName}, ${regionByNutsId.nutsName}`
      }}
    </h6>
    <h1>Summary</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>

    <b-row>
      <b-col col lg="6" cols="12">
        <chart-card :height="920" :title="`${metricString} by Sector`" :loading="$apollo.loading">
          <client-only>
            <apex-chart
              width="100%"
              height="1200px"
              type="bar"
              :options="{
                chart: {
                  offsetY: -30,
                  id: 'chart-sectors',
                  toolbar: { show: false }
                },
                plotOptions: {
                  bar: {
                    horizontal: true,
                    dataLabels: {
                      position: 'top'
                    }
                  }
                },
                xaxis: {
                  categories: sectorAxis
                }
              }"
              :series="[
                {
                  name: metricString,
                  data: sectorData
                }
              ]"
            />
          </client-only>
        </chart-card>
      </b-col>
      <b-col col lg="6" cols="12">
        <b-row>
          <b-col cols="12">
            <chart-card :title="`Top 5 Sectors by ${metricString}`" :loading="$apollo.loading">
              <top-5-line
                chartId="chart-top-5"
                :year="year"
                :metric="metric"
                :nuts="$route.params.nuts"
              />
            </chart-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <chart-card :title="`Bottom 5 Sectors by ${metricString}`" :loading="$apollo.loading">
              <bottom-5-line
                chartId="chart-bottom-5"
                :year="year"
                :metric="metric"
                :nuts="$route.params.nuts"
              />
            </chart-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import MapMarkerIcon from '~/node_modules/vue-material-design-icons/MapMarker'
import ChartCard from '~/components/ChartCard'
import Top5Line from './components/Top5Line'
import Bottom5Line from './components/Bottom5Line'
import { regionalMetrics } from '~/enums/regionalMetrics'
import { capitalizeFirstLetter, twoDecimalPlaces } from '~/utils/formatters'

export default {
  components: {
    MapMarkerIcon,
    ChartCard,
    Top5Line,
    Bottom5Line
  },
  props: {
    regionByNutsId: {
      type: Object,
      default: () => ({ countryByCountryId: { nutsName: '' }, nutsName: '' })
    },
    year: {
      type: Number,
      default: 2016
    },
    metric: {
      type: String,
      default: 'specialisation'
    }
  },
  data() {
    return {}
  },
  apollo: {
    regionalSectorPerformance: {
      query() {
        return gql`
          query RegionalSectorPerformance($nuts: String!, $metric: String!) {
            regionalSectorPerformance(nuts: $nuts, metric: $metric) {
              nodes {
                sector
                value
              }
            }
          }
        `
      },
      variables() {
        return {
          nuts: this.$route.params.nuts,
          metric: this.metric
        }
      },
      update: (data) => data.regionalSectorPerformance.nodes
    }
  },
  computed: {
    sectorAxis() {
      return !this.$apollo.loading && this.regionalSectorPerformance
        ? this.regionalSectorPerformance.map((x) => x.sector)
        : []
    },
    sectorData() {
      return !this.$apollo.loading && this.regionalSectorPerformance
        ? this.regionalSectorPerformance.map((x) => twoDecimalPlaces(x.value))
        : []
    },
    metricString() {
      return capitalizeFirstLetter(regionalMetrics[this.metric])
    }
  }
}
</script>
