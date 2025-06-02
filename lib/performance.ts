// Performance monitoring and optimization utilities

export const preloadCriticalResources = () => {
  if (typeof window !== "undefined") {
    // Preload critical images
    const criticalImages = ["/images/logo-green-warehouse-updated.png", "/images/warehouse-meeting.png"]

    criticalImages.forEach((src) => {
      const link = document.createElement("link")
      link.rel = "preload"
      link.as = "image"
      link.href = src
      document.head.appendChild(link)
    })
  }
}

// Lazy loading utility
export const lazyLoadImages = () => {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          img.src = img.dataset.src || ""
          img.classList.remove("lazy")
          imageObserver.unobserve(img)
        }
      })
    })

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img)
    })
  }
}

// Bundle size optimization
export const loadComponentDynamically = (componentPath: string) => {
  return import(componentPath)
}

// Cache management
export const cacheManager = {
  set: (key: string, data: any, ttl = 3600000) => {
    // 1 hour default
    const item = {
      data,
      timestamp: Date.now(),
      ttl,
    }
    localStorage.setItem(key, JSON.stringify(item))
  },

  get: (key: string) => {
    const item = localStorage.getItem(key)
    if (!item) return null

    const parsed = JSON.parse(item)
    if (Date.now() - parsed.timestamp > parsed.ttl) {
      localStorage.removeItem(key)
      return null
    }

    return parsed.data
  },

  clear: (key?: string) => {
    if (key) {
      localStorage.removeItem(key)
    } else {
      localStorage.clear()
    }
  },
}
