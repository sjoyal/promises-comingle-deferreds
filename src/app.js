import $ from 'jquery'
import { addOnClick, logResult, removeChildrenIfPresent } from './domUtils'
import { deferredGetName, getName, isFrom } from './requests'
import { deferredify, promisify } from './util'

const nameUrl = 'https://swapi.co/api/people/?search=r2'
const badPathNameUrl = 'https://swapi.co/api/peeple/?search=r2'
const planetUrl = 'https://swapi.co/api/planets/8/'

const Examples = [
  {
    num: 1,
    running: false,
    run() {
      if (this.running) return

      this.running = true
      const target = `.result-preview-${this.num}`
      const nameProxy = getName(nameUrl)
      const planetProxy = isFrom(planetUrl)

      removeChildrenIfPresent(target)
      nameProxy()
        .then(result => Promise.all([result, planetProxy()]))
        .then(
          ([name, planet]) => {
            const msg = `${name} is from ${planet}`
            logResult(target, msg)
            this.running = false
          },
          err => {
            logResult(target, err, true)
            this.running = false
          }
        )
    },
  },
  {
    num: 2,
    running: false,
    run() {
      if (this.running) return

      this.running = true
      const target = `.result-preview-${this.num}`

      removeChildrenIfPresent(target)
      deferredify(getName(nameUrl))
        .then(result => Promise.all([result, deferredify(isFrom(planetUrl))]))
        .then(
          result => {
            if (!Array.isArray(result)) {
              logResult(target, result, true)
            } else {
              logResult(target, `${name} is from ${planet}`)
            }

            this.running = false
          },
          err => {
            logResult(target, err, true)
            this.running = false
          }
        )
    },
  },
  {
    num: 3,
    running: false,
    run() {
      if (this.running) return

      this.running = true
      const target = `.result-preview-${this.num}`

      removeChildrenIfPresent(target)
      deferredify(getName(nameUrl))
        .then(result => $.when([result, deferredify(isFrom(planetUrl))]))
        .then(
          ([name, planet]) => {
            const msg = `${name} is from ${planet}`
            logResult(target, msg)
            this.running = false
          },
          err => {
            logResult(target, err, true)
            this.running = false
          }
        )
    },
  },
  {
    num: 4,
    running: false,
    run() {
      if (this.running) return

      this.running = true
      const target = `.result-preview-${this.num}`

      removeChildrenIfPresent(target)
      deferredify(getName(nameUrl))
        .then(result => promisify(isFrom(planetUrl)))
        .then(
          result => {
            if (result instanceof Promise) {
              logResult(target, result, true)
            } else {
              logResult(target, `Retrieved planet name: ${name}`)
            }

            this.running = false
          },
          err => {
            logResult(target, err, true)
            this.running = false
          }
        )
    },
  },
  {
    num: 5,
    running: false,
    run() {
      if (this.running) return

      this.running = true
      const target = `.result-preview-${this.num}`

      removeChildrenIfPresent(target)
      deferredify(getName(nameUrl))
        .then(result => deferredify(isFrom(planetUrl)))
        .then(
          name => {
            const msg = `Retrieved planet name: ${name}`
            logResult(target, msg)
            this.running = false
          },
          err => {
            logResult(target, err, true)
            this.running = false
          }
        )
    },
  },
  {
    num: 6,
    running: false,
    run() {
      if (this.running) return

      this.running = true
      const target = `.result-preview-${this.num}`
      const nameProxy = getName(badPathNameUrl)

      removeChildrenIfPresent(target)
      nameProxy().then(
        result => {
          logResult(target, result)
          this.running = false
        },
        err => {
          logResult(target, err, true)
          this.running = false
        }
      )
    },
  },
  {
    num: 7,
    running: false,
    run() {
      if (this.running) return

      this.running = true
      const target = `.result-preview-${this.num}`
      const nameProxy = deferredGetName(badPathNameUrl)

      removeChildrenIfPresent(target)
      nameProxy().then(
        result => {
          logResult(target, result)
          this.running = false
        },
        err => {
          logResult(target, err, true)
          this.running = false
        }
      )
    },
  },
]

;(function() {
  Examples.map(ex => {
    const cb = ex.run.bind(ex)
    addOnClick(`.example-${ex.num}`, cb)
  })
})()
