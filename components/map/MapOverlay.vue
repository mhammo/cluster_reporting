<template>
  <div class="map_overlay">
    <div class="map_col--left">
      <div class="map_card map_filterbox">
        <a
          href="#"
          class="map_filterbox_open"
          role="button"
          title="Open filter pane"
          aria-label="Open filter pane"
          @click="showFilters"
        >
          <filter-outline />
        </a>
        <a
          href="#"
          class="map_filterbox_collapse"
          role="button"
          title="Collapse filter pane"
          aria-label="Collapse filter pane"
          @click="hideFilters"
        >
          <chevron-left />
        </a>
        <div class="map_filterbox_body">
          <h4>Select a region</h4>
          <hr />
          <b-form-group
            label="Region type"
            label-for="region-type"
            description="Switch between regional or national sections"
          >
            <b-form-select
              id="region-type"
              v-model="region"
              :options="regionOptions"
              class="form-control"
              @change="$emit('change-region-type', region)"
            ></b-form-select>
          </b-form-group>
          <b-form-group
            label="Metric"
            label-for="map-metric"
            description="Select a metric to view on the choropleth"
          >
            <b-form-select
              id="map-metric"
              v-model="metric"
              :options="metricOptions"
              class="form-control"
              @change="$emit('change-category', metric)"
            ></b-form-select>
          </b-form-group>
          <b-form-group
            label="Year"
            label-for="year"
            description="Select the year you would like to view data for"
          >
            <b-form-select
              id="year"
              v-model="yearValue"
              :options="yearOptions"
              class="form-control"
              @change="$emit('change-year', yearValue)"
            ></b-form-select>
          </b-form-group>
        </div>
      </div>
    </div>
    <div class="map_col--right">
      <div class="map_legend_wrapper">
        <map-gradient-legend v-bind="{ regionData: regionFigures }" />
      </div>
      <div class="card--white map_infobox">
        <map-info v-bind="{ selected, category }" />
      </div>
    </div>
  </div>
</template>

<script>
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue'
import FilterOutline from 'vue-material-design-icons/FilterOutline.vue'
import { regionalMetrics } from '../../enums/regionalMetrics'
import MapInfo from './MapInfo'
import MapGradientLegend from './MapGradientLegend'

export default {
  components: {
    MapInfo,
    MapGradientLegend,
    ChevronLeft,
    FilterOutline
  },
  props: {
    year: { type: Number, default: 2016 },
    regionType: { type: Number, default: 1 },
    selected: { type: Object, default: null },
    category: { type: String, default: 'employment' },
    regionData: { type: Array, default: null }
  },
  data() {
    return {
      region: this.regionType,
      regionOptions: [
        { value: 1, text: 'Regional' },
        { value: 2, text: 'National' }
      ],
      metric: this.category,
      metricOptions: Object.keys(regionalMetrics).map((x) => ({
        value: x,
        text: regionalMetrics[x]
      })),
      yearValue: this.year,
      yearOptions: [
        { value: 2020, text: '2020' },
        { value: 2019, text: '2019' },
        { value: 2018, text: '2018' },
        { value: 2017, text: '2017' },
        { value: 2016, text: '2016' },
        { value: 2015, text: '2015' },
        { value: 2014, text: '2014' }
      ]
    }
  },
  computed: {
    regionFigures() {
      return (
        this.regionData &&
        this.regionData.map((x) => x[this.category]).filter((x) => !isNaN(x))
      )
    }
  },
  methods: {
    hideFilters() {
      document.querySelector('.map_filterbox').classList.add('collapsed')
    },
    showFilters() {
      document.querySelector('.map_filterbox').classList.remove('collapsed')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

.map_overlay {
  top: 0;
  left: 0;
  position: absolute;
  display: flex;
  height: 100%;
  width: 100%;
  z-index: 1002;
  pointer-events: none;
}

.map_filterbox_body {
  overflow-y: hidden;
  height: 100%;
}

.map_filterbox {
  width: 370px;
  height: 460px;
  z-index: 1002;
  margin: 0 0 20px 40px;
  pointer-events: initial;
  position: relative;
  transition: all 0.5s;

  &.collapsed {
    width: 45px;
    height: 45px;
    background: $color-background-contrast;
    color: $color-text-contrast-header;
    padding: 0px;

    .map_filterbox_body {
      display: none;
    }

    .map_filterbox_collapse {
      display: none;
    }

    .map_filterbox_open {
      opacity: 1;
      pointer-events: initial;
      color: white;
    }
  }
}

.map_filterbox_open {
  bottom: 0;
  left: 0;
  position: absolute;
  height: 45px;
  width: 45px;
  padding: 5px 10px 10px 7px;
  font-size: 30px;
  line-height: 30px;
  color: $color-text-contrast-header;
  opacity: 0;
  pointer-events: none;
  transition-property: opacity;
  transition-duration: 0.3s;
  transition-delay: 0.4s;
}

.map_filterbox_collapse {
  top: 0;
  right: 0;
  position: absolute;
  height: 45px;
  width: 45px;
  margin-right: -45px;
  background: $color-background-contrast;
  color: $color-text-contrast-header;
  padding: 5px 10px 10px 7px;
  font-size: 30px;
  line-height: 30px;

  &:hover {
    text-decoration: none;
  }
}

.map_legend_wrapper {
  margin: 20px 20px 0 0;
  pointer-events: initial;
}

.map_infobox {
  height: 200px;
  width: 280px;
  margin: 150px 20px 0 0;
  padding: 0;
  pointer-events: initial;
}

.map_col--left {
  display: flex;
  flex: 1 1;
  flex-direction: column-reverse;
}

.map_col--right {
  display: flex;
  flex: 1 1;
  flex-direction: column;
  align-items: flex-end;
}
</style>
