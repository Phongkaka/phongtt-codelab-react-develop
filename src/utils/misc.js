import lodash from 'lodash'
import Configs from 'app/configs'

export default class Misc {
  static trimObjectProperties = (obj, properties) => {
    const data = lodash.cloneDeep(obj)

    if (lodash.isArray(properties)) {
      properties.forEach((property) => {
        data[property] = data[property]?.trim()
      })
    } else {
      lodash.keys(obj).forEach((key) => {
        data[key] = data[key]?.trim()
      })
    }

    return data
  }

  static getAvatarURL = name => name && `${Configs.API_URL}/images/avatar/${name}`

  static getCardURL = name => name && `${Configs.API_URL}/images/card/${name}`
}
