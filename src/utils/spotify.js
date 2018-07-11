import * as SpotifyWebApi from 'spotify-web-api-js'

class SpotifyInstance {
  constructor(){
    if(this.instance){
      return this.instance
    }

    const spotify = new SpotifyWebApi()

    this.instance = spotify

    return this.instance
  }
}

SpotifyInstance.instance = null


export default SpotifyInstance
