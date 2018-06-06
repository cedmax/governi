import { y } from "./constants";

function bucketNumbers (data, bucketCount, max) {
  const buckets = new Array(bucketCount).fill().map(() => [])

  let min = 0
  data.forEach(entry => {
    if (entry[1] < min) min = entry[1]
    if (entry[1] > max) max = entry[1]
  })

  const inc = (max - min) / bucketCount
  data.forEach(entry => {
    if (entry[1] === max) buckets[bucketCount - 1].push(entry)
    else buckets[((entry[1] - min) / inc) | 0].push(entry)
  })

  return buckets
}

const remapBuckets = (buckets, ranges) => {
  const rangeLabels = []
  const rangeData = buckets.reduce((acc, bucket, i) => {
    rangeLabels.push([
      Math.min(...bucket.map(item => item[1])) * 1000,
      Math.max(...bucket.map(item => item[1])) * 1000
    ])
    return Object.assign(
      acc,
      bucket.reduce((cache, item) => {
        cache[item[0]] = Object.assign(
          { value: item[1] * 1000 },
          { level: ranges[ranges.length - 1 - i] }
        )
        return cache
      }, {})
    )
  }, {})

  return {
    data: rangeData,
    labels: rangeLabels.reverse()
  }
}

export const defineRanges = (data, ranges) => {
  const values = Object.keys(data)
    .map(key => [key, data[key] / 1000])
    .sort((a, b) => a[1] - b[1])
  const max = Math.ceil(Math.max(...values.map(a => a[1])))
  const buckets = bucketNumbers(values, 4, max)

  return remapBuckets(buckets, ranges)
}

export const fixKey = str =>
  str
    .toUpperCase()
    .split(' ')
    .join('-')

export const setMapHeight = (height) => height + y * 1.7

export const transform = (data, formatter) =>
  data.reduce((acc, item) => {
    const regione = fixKey(item.regione)
    acc[regione] = acc[regione] || 0
    acc[regione] = acc[regione] + formatter(item)
    return acc
  }, {})

export const fixCurrentGovernment = (govs) => govs.map(({dal, ...gov}) => (!dal) ? gov : ({
  ...gov,
  giorni: parseInt((new Date() - new Date(dal)) / (1000 * 60 * 60 * 24), 10)
})) 