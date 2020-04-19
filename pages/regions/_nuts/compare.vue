<template>
  <div>
    <h6 class="header--location">
      <map-marker-icon />
      {{
      `${regionByNutsId.countryByCountryId.nutsName}, ${regionByNutsId.nutsName}`
      }}
    </h6>
    <h1>Compare to Another Region</h1>
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
      <loader :spinning="$apollo.queries.getRegionalStatistics.loading" />
      <b-col class="col--map" :cols="12" :xl="6">
        <Map
          v-bind="{
              showFilters: false,
              regionData,
              loading: $apollo.loading,
              category: metric,
              year,
              regionType: 1,
              options: {
                zoomControl: false,
                zoom: 4,
                center: [55.9464418, 8.1277591]
              }
            }"
          @selected="setSelected"
        />
      </b-col>
      <b-col style="position: relative;" :cols="12" :xl="6">
        <loader :spinning="$apollo.queries.getRegionComparison.loading" />
        <chart-card v-if="otherRegion" :title="otherRegion.nutsName" :height="600">
          <div class="chart_card__metric_wrapper">
            <div class="chart_card__metric" v-for="i in otherRegion.metricNames.length" :key="i">
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
                  categories: [convertMetricEnum(otherRegion.metricNames[i-1])],
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
                    text: convertMetricEnum(otherRegion.metricNames[i-1]),
                    align: 'center',
                    floating: true                    
                }
              }"
                :series="[
              {
                name: otherRegion.nutsName,
                data: [twoDecimalPlaces(otherRegion.metricValues[i-1])]
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
</template>

<script>
import gql from 'graphql-tag'
import MapMarkerIcon from '~/node_modules/vue-material-design-icons/MapMarker'
import ChartCard from '~/components/ChartCard'
import Map from '~/components/map/Map'
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
    Map,
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
    return { chartColors, regionData: [], selected: null }
  },
  apollo: {
    // Simple query that will update the 'hello' vue property
    getRegionalStatistics: {
      query() {
        return gql`
          query RegionalStatistics(
            $year: Int!
            $regionType: Int!
          ) {
            getRegionalStatistics(yr: $year, regionType: $regionType) {
              nodes {
                regionCode
                ${this.metric}
              }
            }
          }
        `
      },
      variables() {
        return {
          year: this.year,
          regionType: 1
        }
      },
      result(key) {
        if (!key.loading && key.data && key.data.getRegionalStatistics)
          this.regionData = key.data.getRegionalStatistics.nodes.map((x) => {
            x[this.metric] = parseInt(x[this.metric])
            return x
          })
      }
    },
    getRegionComparison: {
      query() {
        return gql`
          query GetRegionComparison($nuts: String!, $otherNuts: String!) {
            getRegionComparison(
              nuts: $nuts
              otherNuts: $otherNuts
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
          nuts: this.$route.params.nuts,
          otherNuts: this.otherNuts
        }
      },
      update: (data) => data.getRegionComparison.nodes,
      skip() {
        return !this.otherNuts
      }
    }
  },
  computed: {
    otherNuts() {
      return (
        this.selected &&
        this.selected.feature.properties.NUTS_ID &&
        this.selected.feature.properties.NUTS_ID
      )
    },
    thisRegion() {
      return this.getRegionComparison
        ? this.getRegionComparison.filter(
            (x) => x.nutsId === this.$route.params.nuts
          )[0]
        : []
    },
    otherRegion() {
      if (!this.getRegionComparison) return null
      const filtered = this.getRegionComparison.filter(
        (x) => x.nutsId === this.otherNuts
      )
      if (filtered.length > 0) return filtered[0]
    }
  },
  methods: {
    twoDecimalPlaces: (x) => kFormatter(twoDecimalPlaces(x)),
    capitalizeFirstLetter: capitalizeFirstLetter,
    convertMetricEnum: (x) => regionalMetrics[x],
    setSelected(selected) {
      this.selected = selected
    }
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

.col--map {
  height: 600px;
  display: flex;
  margin: 20px 0;
}
</style>