<template>
  <client-only>
    <apex-chart
      width="100%"
      height="320px"
      type="line"
      :options="{
        chart: {
          offsetY: -30,
          id: chartId,
          toolbar: { show: false }
        },
        xaxis: {
          categories: categories
        },
        markers: {
          size: 5,
          colors: ['#fff'],
          strokeColors: chartColors,
          strokeWidth: 2,
          hover: {
            size: 7,
          }
        },
        colors: chartColors
      }"
      :series="series"
    />
  </client-only>
</template>

<script>
import { twoDecimalPlaces } from '~/utils/formatters'
import { chartColors } from '~/utils/colors'

export default {
  props: {
    chartData: { type: Array, default: () => [] },
    chartId: { type: String, required: true }
  },
  data() {
    return { chartColors }
  },
  computed: {
    categories() {
      return this.chartData
        ? this.chartData
            .map((item) => item.year)
            .filter((value, i, self) => self.indexOf(value) === i)
        : []
    },
    series() {
      return this.chartData
        ? this.chartData
            .sort((a, b) => a.year - b.year)
            .reduce((prev, curr) => {
              const i = prev.map((x) => x.name).indexOf(curr.sector)
              if (i === -1)
                prev.push({
                  name: curr.sector,
                  data: [twoDecimalPlaces(curr.value)]
                })
              else prev[i].data.push(twoDecimalPlaces(curr.value))
              return prev
            }, [])
        : []
    }
  },
  beforeDestroy() {
    this.series.splice(0)
  }
}
</script>
