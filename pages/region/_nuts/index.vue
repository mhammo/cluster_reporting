<template>
  <div v-if="regionByRegionCode">
    <h6>
      <map-marker-icon />
      {{ `${regionByRegionCode.country}, ${regionByRegionCode.region}` }}
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
        <chart-card title="Specialisation by Sector" />
      </b-col>
      <b-col col lg="6" cols="12">
        <chart-card />
      </b-col>
    </b-row>
    <b-row>
      <b-col col lg="6" cols="12">
        <chart-card />
      </b-col>
      <b-col col lg="6" cols="12">
        <chart-card />
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
  apollo: {
    // Simple query that will update the 'hello' vue property
    regionByRegionCode: {
      query() {
        return gql`
          query RegionalStatistics($nuts: String!) {
            regionByRegionCode(regionCode: $nuts) {
              region
              country
            }
          }
        `
      },
      variables() {
        return {
          nuts: this.$route.params.nuts
        }
      }
    }
  }
}
</script>
