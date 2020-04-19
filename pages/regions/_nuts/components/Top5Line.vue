<template>
  <line-chart :chartData="regionalTopSectorTrend" :chartId="chartId" />
</template>

<script>
import gql from 'graphql-tag'
import LineChart from '~/components/charts/LineChart'

export default {
  components: { LineChart },
  props: {
    year: { type: Number, default: 2016 },
    metric: { type: String, default: 'employment' },
    nuts: { type: String, default: 'UKE4' },
    chartId: { type: String, required: true }
  },
  data() {
    return {}
  },
  apollo: {
    regionalTopSectorTrend: {
      query() {
        return gql`
          query RegionalTopSectorTrend($nuts: String!, $metric: String!) {
            regionalTopSectorTrend(nuts: $nuts, metric: $metric) {
              nodes {
                sector
                year
                value
              }
            }
          }
        `
      },
      variables() {
        return {
          nuts: this.nuts,
          metric: this.metric
        }
      },
      update: (data) => data.regionalTopSectorTrend.nodes
    }
  }
}
</script>
