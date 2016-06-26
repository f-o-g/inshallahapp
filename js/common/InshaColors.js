/*
 * @providesModule InshaColors
 * @flow
 */

'use strict'

const LOCATION_COLORS = {
  // 'HERBST': '#00E3AD',
}

function colorForLocation(location: ?string): string {
  if (!location) {
    return 'black'
  }

  let color = LOCATION_COLORS[location.toUpperCase()]
  if (!color) {
    console.warn(`Location '${location}' has no color`)
    color = 'black'
  }
  return color
}

function colorForTopic(count: number, index: number): string {
  const hue = Math.round(360 * index / (count + 1))
  return `hsl(${hue}, 74%, 65%)`
}

export default {
  actionText: '#3FB4CF',
  inactiveText: '#9B9B9B',
  darkText: '#032250',
  lightText: '#7F91A7',
  cellBorder: '#EEEEEE',
  darkBackground: '#183E63',
  limeA100: '#F4FF81',
  colorForLocation,
  colorForTopic,
}
