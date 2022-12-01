const fs = require('fs');

const axios = require('axios');

class Searchs{
    history = [];
    dbPath= './db/database.json';
    constructor() {
        //TODO: leer DB si existe
        this.readDB();
    }

    get capitalLetter(){
        return this.history.map( place =>{
            let words = place.split(' ');
            words = words.map( w => w[0].toUpperCase() + w.substring(1));

            return words.join(' ');
        })
    }

    get paramMapBox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es',
            'trophies': true
        }
    }

    get paramOpenWeather() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'lang': 'es',
            'units': 'metric'
        }
    }

    async currentWeather (lat, lon) {
        try {
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: {...this.paramOpenWeather,lat, lon},
                headers: {
                    'Accept': 'application/json', 
                    'Accept-Encoding': 'identity'
                }
            })

            const { data } = await instance.get();
            const { temp, temp_max, temp_min } = data.main;
            const { description } = data.weather[0]
            
            return {
                temp,
                temp_max,
                temp_min,
                description
            };
        } catch (error) {
            console.error('Error en la obtención del clima: ',error);
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
                        'Accept': 'application/json', 
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
    addHistory( place = ''){
        //TODO: prevenir duplicados
        if (this.history.includes(place.toLocaleLowerCase())){
            return;
        }
        //restric to 5 place
        this.history = this.history.slice(0,4);
        this.history.unshift(place.toLocaleLowerCase());
        //save on file
        this.saveDB();
    }

    saveDB(){
        const payload = {
            history: this.history
        }
        fs.writeFileSync(this.dbPath, JSON.stringify( payload ));
    }

    readDB() {
        if (!fs.existsSync(this.dbPath)) return;
        const info = fs.readFileSync(this.dbPath, {encoding:'utf-8'})

        const {history} = JSON.parse(info);

        this.history = history;
    }
}

module.exports = Searchs;
