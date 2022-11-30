const axios = require('axios');

class Searchs{
    historia = ['Madrid', 'Salta'];

    constructor() {
        //TODO: leer DB si existe
    }

    get paramMapBox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es',
            'trophies': true
        }
    }

    async city( place = ''){
        //petition http
        try {
            //console.log('APY_KEY', process.env.MAPBOX_KEY);
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ place }.json`,
                params: this.paramMapBox,
                headers: {
                        Accept: 'application/json', 
                        'Accept-Encoding': 'identity'
                    }
              });

            const resp = await instance.get();

            return resp.data.features.map( place =>({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1]
            }))
        } catch (error) {
            console.log('No se encontro nada: ', error);
            return [];
        }
    }

}

module.exports = Searchs;
