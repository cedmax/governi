import { feature as topojsonFeature } from 'topojson'
import { geoPath, geoMercator } from 'd3-geo'
import { fixKey } from '../../helpers/utils'
import { ranges, y as originalY, angle, x } from '../../helpers/constants'

const weightCalc = (ranges, weight) => ranges.length - 1 - ranges.indexOf(weight)

export const legend = (
  rc,
  canvas,
  colors,
  { labels, title, none, note, preciseFormatter, rangeFormatter }
) => {
  const ctx = canvas.getContext('2d')
  let y = originalY + 40;
  ctx.font = '15px Arial'
  ctx.fillText(title, x, originalY + 20)
  ctx.font = '13px Arial'
  ranges.forEach((range, i) => {
    const weight = weightCalc(ranges, range);
    rc.rectangle(x, y, 15, 15, { 
      bowing: 0, 
      fill: colors[range], 
      fillWeight: weight,
      hachureAngle: weight * angle
    })
    const label = labels[i]
    if (label[0] === label[1]) {
      ctx.fillText(preciseFormatter(label[0]), x + 22, y + 11)
    } else {
      ctx.fillText(rangeFormatter(label[0], label[1]), x + 22, y + 11)
    }

    y = y + 22
  })
  rc.rectangle(x, y, 15, 15, { bowing: 0, fill: 'white' })
  ctx.fillText(none, x + 22, y + 12)
  if (note) {
    ctx.fillText(note, x, y + 50)
  }
  rc.rectangle(x - 10, originalY, 270, y - originalY + 30, { bowing: 0 })
}

export const map = async (it, rc, dataReady, { height, colors }) => {
  const path = geoPath().projection(
    geoMercator()
      .scale(2500)
      .translate([-250, height * 2.5])
  )
  const { features } = topojsonFeature(it, it.objects.sub)

  for (let feature of features) {
    const data = dataReady[fixKey(feature.properties.name)]
    const weight = data && data.level

    const weightOption = {}
    if (weight) {
      weightOption.fillWeight = weightCalc(ranges, weight)
      weightOption.hachureAngle = weightOption.fillWeight * angle
    }

    await rc.path(path(feature), {
      ...weightOption,
      fill: colors.fill(fixKey(feature.properties.name), data)
    })
  }
}
