<template>
  <Map
    @change-category="changeCategory"
    @change-region-type="changeRegionType"
    @change-year="changeYear"
    v-bind="{
        regionData,
        loading: $apollo.loading,
        category,
        year,
        regionType,
        options: {
          zoomControl: false,
          zoom: 4,
          center: [55.9464418, 8.1277591]
        }
      }"
  />
</template>

<script>
import gql from 'graphql-tag'
import Map from '~/components/map/Map.vue'

export default {
  components: {
    Map
  },
  apollo: {
    // Simple query that will update the 'hello' vue property
    regionalMetrics: {
      query() {
        return gql`
        query RegionalStatistics($year: Int!, $regionType: Int!) {
          getRegionalStatistics(yr: $year, regionType: $regionType) {
              nodes {
                regionCode
                ${this.category}
              }
          }
        }
      `
      },
      variables() {
        return {
          year: this.year,
          regionType: this.regionType
        }
      },
      result(key) {
        if (!key.loading && key.data && key.data.getRegionalStatistics)
          this.regionData = key.data.getRegionalStatistics.nodes.map((x) => {
            x[this.category] = parseInt(x[this.category])
            return x
          })
      }
    }
  },
  data() {
    return {
      regionData: [],
      category: 'employment',
      year: 2016,
      regionType: 1
    }
  },
  methods: {
    changeCategory(metric) {
      this.category = metric
    },
    changeRegionType(type) {
      this.regionType = type
    },
    changeYear(yearValue) {
      this.year = yearValue
    }
  }
}
</script>
