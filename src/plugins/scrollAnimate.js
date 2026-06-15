const isBrowser = typeof window !== 'undefined'

const createObserver = () => {
  if (!isBrowser || !('IntersectionObserver' in window)) {
    return null
  }

  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return
      }
      entry.target.classList.add('aos-animate')
      observer.unobserve(entry.target)
    })
  }, {
    threshold: 0.12,
  })
}

const observer = createObserver()

export default {
  install(app) {
    app.directive('aos', {
      mounted(el) {
        if (!el.classList.contains('aos-init')) {
          el.classList.add('aos-init')
        }
        if (observer) {
          observer.observe(el)
        } else {
          el.classList.add('aos-animate')
        }
      },
      unmounted(el) {
        observer?.unobserve(el)
      },
    })
  },
}
