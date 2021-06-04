const withImages = require('next-images')
const withCSS = require('@zeit/next-css')
const withBundleAnalyzer = require('@next/bundle-analyzer')

const compose = (plugins) => ({
  webpack(config, options) {
    return plugins.reduce((config, plugin) => {
      if (plugin instanceof Array) {
        const [_plugin, ...args] = plugin
        plugin = _plugin(...args)
      }
      if (plugin instanceof Function) {
        plugin = plugin()
      }
      if (plugin && plugin.webpack instanceof Function) {
        return plugin.webpack(config, options)
      }
      return config
    }, config)
  },

  webpackDevMiddleware(config) {
    return plugins.reduce((config, plugin) => {
      if (plugin instanceof Array) {
        const [_plugin, ...args] = plugin
        plugin = _plugin(...args)
      }
      if (plugin instanceof Function) {
        plugin = plugin()
      }
      if (plugin && plugin.webpackDevMiddleware instanceof Function) {
        return plugin.webpackDevMiddleware(config)
      }
      return config
    }, config)
  }
})

module.exports = compose([
  [
    withBundleAnalyzer,
    {
      enabled: process.env.ANALYZE === 'true'
    }
  ]
])

module.exports = withImages({
  webpack(config, options) {
    return config
  }
})

module.exports = withCSS({
  cssLoaderOptions: {
    url: false
  }
})

module.exports = {
  trailingSlash: true,
  images: {
    loader: 'imgix'
  },
  async redirects() {
    return [
      {
        source: '/report/',
        destination: '/dashboard',
        permanent: true
      }
    ]
  }
}
