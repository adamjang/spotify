const initialState = {
  deviceId: null
}

export default function spotify(state = initialState, action) {
  switch (action.type) {

    case 'SPOTIFY_DEVICE':
      return Object.assign({}, state, {
        deviceId: action.deviceId
      })

    default:
      return state

  }
}
