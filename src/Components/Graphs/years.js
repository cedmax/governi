import rough from '../../roughjs/src'
import { ranges, roughConfig } from '../../helpers/constants'
import generateColors from '../../helpers/colors'
import { defineRanges, setMapHeight, transform } from '../../helpers/utils'
import { map, legend } from './parts'

export default async (canvas, gov, geo) => {
  const { data, labels } = defineRanges(
    transform(gov, ({ giorni }) => giorni),
    ranges
  )
  const colors = generateColors('#1C010C')
  const rc = rough.canvas(canvas, roughConfig)

  legend(
    rc,
    canvas,
    colors,
    {
      labels,
      title: 'Presidenze del consiglio per regione*',
      none: 'Nessun presidente del consiglio',
      note: '*durata cumulativa',
      preciseFormatter: days => `più di ${Math.floor(days / 365)} anni`,
      rangeFormatter: (min, max) =>
        `tra ${Math.floor(min / 365)} e ${Math.floor(max / 365)} anni`
    }
  )

  map(geo, rc, data, {
    height: setMapHeight(canvas.height),
    colors
  })
}
