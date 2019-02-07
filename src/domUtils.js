export function addOnClick(target, cb) {
  const el = document.querySelector(target)

  if (el) {
    el.addEventListener('click', cb)
  }
}

export function logResult(target, msg, err = false) {
  const parentEl = document.querySelector(target)
  const childEl = document.createElement('span')

  childEl.innerText = msg
  childEl.classList.add(err ? 'error' : 'success')

  if (parentEl) {
    parentEl.appendChild(childEl)
  }
}

export function removeChildrenIfPresent(target) {
  const parentEl = document.querySelector(target)

  if (parentEl.hasChildNodes()) {
    const nodes = parentEl.childNodes

    nodes.forEach(n => {
      parentEl.removeChild(n)
    })
  }
}
