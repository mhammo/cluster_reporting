import { gradientColors } from './colors'

const R = require('ramda')
const topojson = require('topojson')

export const getGradientLevels = (mean, min, max) => {
  const diff =
    R.mean([mean - min, max - mean]) * 0.0 + R.min(mean - min, max - mean) * 1.5 // weighted slightly towards the peaks
  const incr = diff / 3
  return [
    min + incr * 6,
    min + incr * 5,
    min + incr * 4,
    min + incr * 3,
    min + incr * 2,
    min + incr
  ]
}

export const createColorFunction = (levels) => {
  return (d) =>
    d === null
      ? '#efefef'
      : d > levels[0]
      ? gradientColors[6]
      : d > levels[1]
      ? gradientColors[5]
      : d > levels[2]
      ? gradientColors[4]
      : d > levels[3]
      ? gradientColors[3]
      : d > levels[4]
      ? gradientColors[2]
      : d > levels[5]
      ? gradientColors[1]
      : gradientColors[0]
}

export const createStyleFunction = (getColor) => {
  return (feature) => {
    return {
      fillColor: getColor(feature.properties.value),
      weight: 1,
      opacity: 0.5,
      color: '#888',
      fillOpacity: 1
    }
  }
}

export const findRealParent = (firstVueParent) => {
  let found = false
  while (firstVueParent && !found) {
    if (firstVueParent.mapObject === undefined) {
      firstVueParent = firstVueParent.$parent
    } else {
      found = true
    }
  }
  return firstVueParent
}

export function topoToGeoJson(data) {
  let geojson

  if (data.type === 'Topology') {
    const keys = Object.keys(data.objects)
    geojson = topojson.feature(data, data.objects[keys[0]])
    return geojson
  }
}

const convertRegionArrayToDict = (array, key) =>
  R.reduce(
    (dict, row) => {
      if (row) dict[row.regionCode] = row[key]
      return dict
    },
    {},
    array
  )

export const addRegionalDataToGeometries = (geom, data, key) => {
  const dict = convertRegionArrayToDict(data, key)
  R.forEach((item) => {
    const x = dict[item.properties.NUTS_ID]
    item.properties.value = x ? (isNaN(x) ? null : x) : null
  }, geom)
}

export const extractAggregates = (data) =>
  R.reduce(
    (aggr, x) => {
      aggr.min = aggr.min ? R.min(aggr.min, x) : x
      aggr.max = aggr.max ? R.max(aggr.max, x) : x
      aggr.sum = aggr.sum ? aggr.sum + x : x
      aggr.count = aggr.count ? aggr.count + 1 : 1
      return aggr
    },
    {},
    data
  )
