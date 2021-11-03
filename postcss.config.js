// eslint-disable-next-line
const lodash = require('lodash')

const NODE_ENV = process.env.NODE_ENV || 'development'
const IS_DEV = NODE_ENV === 'development'

const configs = {
  plugins: {
    'autoprefixer': {
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9'
      ],
      flexbox: 'no-2009'
    }
  }
}

const prodConfigs = {
  plugins: {
    'cssnano': {}
  }
}

module.exports = IS_DEV ? configs : lodash.merge(configs, prodConfigs)
