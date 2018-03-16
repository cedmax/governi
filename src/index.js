import './index.css'
import React from 'react';
import { render } from 'react-dom';
import App from './App'

(async () => {
  const govResponse = fetch('./governi.json')
  const geoResponse = fetch('./it-reg.json')

  const data = [await govResponse, await geoResponse]
  const [governments, geo] = await Promise.all(
    data.map(async response => {
      return await response.json()
    })
  )

  render(
    <App governments={governments} geo={geo} />,
    document.getElementById('root')
  )
})()
