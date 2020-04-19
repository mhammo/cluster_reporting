<template>
  <div>
    <h6 class="header--location">
      <map-marker-icon />
      {{
      `${regionByNutsId.countryByCountryId.nutsName}, ${regionByNutsId.nutsName}`
      }}
    </h6>
    <h1>Similar Regions</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
    <div style="position: relative;">
      <loader :spinning="$apollo.loading" />
      <b-row v-for="region in regions" :key="region.nutsId">
        <b-col cols="12">
          <chart-card :title="region.nutsName" class="chart_card--long">
            <map-region :geojson="region.geojson" :bounds="region.bounds" />
            <div class="chart_card__metric_wrapper">
              <div class="chart_card__metric" v-for="i in region.metricNames.length" :key="i">
                <apex-chart
                  type="bar"
                  width="300"
                  height="100%"
                  :options="{
                chart: {     
                  toolbar: { show: false },
                  fontFamily: 'Montserrat'
                },
                xaxis: {
                  categories: [convertMetricEnum(region.metricNames[i-1])],
                },
                yaxis: {
                  show: false
                },
                legend: {
                  show: false
                },
                plotOptions: {
                  bar: {
                    horizontal: true,
                    dataLabels: {
                      position: 'top'
                    }
                  }
                },
                colors: chartColors,
                title: {
                    text: convertMetricEnum(region.metricNames[i-1]),
                    align: 'center',
                    floating: true                    
                }
              }"
                  :series="[
              {
                name: region.nutsName,
                data: [twoDecimalPlaces(region.metricValues[i-1])]
              },
              {
                name: thisRegion.nutsName,
                data: [twoDecimalPlaces(thisRegion.metricValues[i-1])]
              }]"
                />
              </div>
            </div>
          </chart-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import MapMarkerIcon from '~/node_modules/vue-material-design-icons/MapMarker'
import ChartCard from '~/components/ChartCard'
import MapRegion from '~/components/map/MapRegion'
import Loader from '~/components/Loader'
import {
  twoDecimalPlaces,
  capitalizeFirstLetter,
  kFormatter
} from '~/utils/formatters'
import { chartColors } from '~/utils/colors'

import { regionalMetrics } from '~/enums/regionalMetrics'

export default {
  components: {
    MapMarkerIcon,
    ChartCard,
    MapRegion,
    Loader
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
    return { chartColors }
  },
  apollo: {
    similarRegions: {
      query() {
        return gql`
          query SimilarRegions($nuts: String!) {
            getSimilarRegions(
              nuts: $nuts
              metrics: [
                "employment"
                "specialisation"
                "clusterStarsSize"
                "clusterStarsSpecialisation"
                "productivityEuros"
                "clusterStarsProductivity"
              ]
            ) {
              nodes {
                nutsId
                bounds
                geojson
                linkStrength
                metricNames
                metricValues
                nutsName
              }
            }
          }
        `
      },
      variables() {
        return {
          nuts: this.$route.params.nuts
        }
      },
      update: (data) => data.getSimilarRegions.nodes
    }
  },
  computed: {
    thisRegion() {
      return this.similarRegions
        ? this.similarRegions.filter(
            (x) => x.nutsId === this.$route.params.nuts
          )[0]
        : []
    },
    regions() {
      return this.similarRegions
        ? this.similarRegions.filter(
            (x) => x.nutsId !== this.$route.params.nuts
          )
        : []
    }
  },
  methods: {
    twoDecimalPlaces: (x) => kFormatter(twoDecimalPlaces(x)),
    capitalizeFirstLetter: capitalizeFirstLetter,
    convertMetricEnum: (x) => regionalMetrics[x]
  }
}
</script>

<style lang="scss" scoped>
.chart_card__metric_wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1 1 auto;
  justify-content: space-evenly;
}

.chart_card__metric {
  padding: 10px;
  max-height: 150px;
}
</style>