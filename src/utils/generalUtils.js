export function capitalizeFirstLetter (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
// Local Storage Manipulation
export function removeHtmlStorage (name) {
  localStorage.removeItem(name)
  localStorage.removeItem(name + '_time')
}

export function setHtmlStorage (name, value, expires) {
  if (expires === undefined || expires === 'null') { expires = 3600 } // default: 1h

  var date = new Date()
  var schedule = Math.round((date.setSeconds(date.getSeconds() + expires)) / 1000)

  localStorage.setItem(name, value)
  localStorage.setItem(name + '_time', schedule)
}

export function statusHtmlStorage (name) {
  var date = new Date()
  var current = Math.round(+date / 1000)

  // Get Schedule
  var storedTime = localStorage.getItem(name + '_time')
  if (storedTime === undefined || storedTime === 'null') { storedTime = 0 }

  // Expired
  if (storedTime < current) {
      // Remove
    removeHtmlStorage(name)
    return 0
  } else {
    return 1
  }
}

// // Status
// var cacheStatus = statusHtmlStorage('cache_name')
// // Has Data
// if (cacheStatus === 1) {
//     // Get Cache
//   var data = localStorage.getItem('cache_name')
//   alert(data)
// // Expired or Empty Cache
// } else {
//   // Get Data
//   var data = 'Pay in cash :)'
//   alert(data)
//
//   // Set Cache (30 seconds)
//   if (cache) { setHtmlStorage('cache_name', data, 30) }
// }
