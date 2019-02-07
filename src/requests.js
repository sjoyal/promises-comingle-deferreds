export function getName(url) {
  return () =>
    fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json()
        }

        throw new Error('problem with request for character')
      })
      .then(data => data.results[0].name, error => error)
}

export function isFrom(url) {
  return () =>
    fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json()
        }

        throw new Error('problem with request for planet')
      })
      .then(results => results.name, error => error)
}

// export function deferredGetName(url) {
//   return () => {
//     const p = $.Deferred()
//     fetch(url)
//       .then(res => {
//         if (res.ok) {
//           return res.json()
//         }
//
//         throw new Error('problem with request for character')
//       })
//       .then(
//         data => {
//           p.resolve(data.results[0].name)
//         },
//         error => {
//           p.reject(error)
//         }
//       )
//
//     return p
//   }
// }

// export function deferredIsFrom(url) {
//   return () => {
//     const p = $.Deferred()
//     fetch(url)
//       .then(res => {
//         if (res.ok) {
//           return res.json()
//         }
//
//         throw new Error('problem with request for planet')
//       })
//       .then(
//         results => {
//           p.resolve(results.name)
//         },
//         err => {
//           p.reject(err)
//         }
//       )
//
//     return p
//   }
// }
