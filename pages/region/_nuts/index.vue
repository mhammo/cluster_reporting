<template>
  <div v-if="regionByNutsId">
    <h6>
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
        <chart-card :tall="true" title="Specialisation by Sector">
          <client-only>
            <apex-chart
              width="100%"
              height="1200px"
              type="bar"
              :options="{
                chart: {
                  offsetY: -30,
                  id: 'vuechart-example',
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
                  categories:
                    !$apollo.loading &&
                    regionalSectorPerformance &&
                    regionalSectorPerformance.map((x) => x.node.sector)
                }
              }"
              :series="[
                {
                  name: 'specialisation',
                  data:
                    !$apollo.loading &&
                    regionalSectorPerformance &&
                    regionalSectorPerformance.map(
                      (x) => Math.round(x.node.specialisation * 10) / 10
                    )
                }
              ]"
            />
          </client-only>
        </chart-card>
      </b-col>
      <b-col col lg="6" cols="12">
        <b-row>
          <b-col cols="12">
            <chart-card />
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <chart-card />
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

export default {
  components: {
    MapMarkerIcon,
    ChartCard
  },
  props: {
    regionByNutsId: {
      type: Object,
      default: () => ({ countryByCountryId: { nutsName: '' }, nutsName: '' })
    },
    year: {
      type: Number,
      default: 2016
    }
  },
  data() {
    return {}
  },
  apollo: {
    regionalSectorPerformance: {
      query() {
        return gql`
          query RegionalSectorPerformance($nuts: String!) {
            regionalSectorPerformance(nuts: $nuts) {
              edges {
                node {
                  sector
                  specialisation
                }
              }
            }
          }
        `
      },
      prefetch: false,
      variables() {
        return {
          nuts: this.$route.params.nuts
        }
      },
      update: (data) => data.regionalSectorPerformance.edges
    }
  }
}
</script>
