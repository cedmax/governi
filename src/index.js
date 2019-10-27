import React from 'react'
import { render } from 'react-dom'
import { fixCurrentGovernment } from './helpers/utils'
import App from './App'
import './index.css'

(async () => {
  const govResponse = fetch('./governi.json')
  const geoResponse = fetch('./it-reg.json')

  const data = [await govResponse, await geoResponse]
  const [governments, geo] = await Promise.all(
    data.map(async response => {
      return response.json()
    })
  )

  const sortedGov = fixCurrentGovernment(governments).sort(
    (a, b) => b.giorni - a.giorni
  )

  render(
    <App governments={sortedGov} geo={geo} />,
    document.getElementById('root')
  )
})()
