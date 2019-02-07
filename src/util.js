import $ from 'jquery'

export function deferredify(request) {
  const p = $.Deferred()

  request().then(
    result => {
      p.resolve(result)
    },
    err => {
      p.reject(err)
    }
  )

  return p
}

export function promisify(request) {
  return new Promise((resolve, reject) => {
    request().then(
      result => {
        resolve(result)
      },
      err => {
        reject(err)
      }
    )
  })
}
