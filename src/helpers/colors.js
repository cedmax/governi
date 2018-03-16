import Color from 'color-js'
import { ranges, topRange } from './constants'

export default topColor => {
  const colors = {
    [topRange]: topColor
  }

  let light = 2.5
  ranges.forEach((range, i) => {
    if (range !== topRange) {
      colors[range] = Color(colors[ranges[i - 1]])
        .lightenByRatio(light)
        .toString()
      light = light - .9
    }
  })

  colors.fill = (name, data) => {
    if (!data) return 'white'
    return colors[data.level]
  }

  return colors
}
