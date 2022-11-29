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
            'language': 'es'
        }
    }

    async city( place = ''){
        //petition http
        try {
            //console.log('APY_KEY', process.env.MAPBOX_KEY);
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ place }.json`,
                params: this.paramMapBox
              });

            const resp = await instance.get();
            const data = JSON.parse(resp);
            console.log(data);
            console.log('StatusCode', resp.status);
            /* const resp = await axios.get('https://reqres.in/api/users?page=2');
            //console.log('Axios',resp.data);
            console.log(API_KEY); */
            return[]; //returno place equal    
        } catch (error) {
            console.log('No se encontro nada: ', error);
            return [];
        }
    }

}

module.exports = Searchs;
