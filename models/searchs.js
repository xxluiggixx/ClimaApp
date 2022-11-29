const axios = require('axios');
class Searchs{
    historia = ['Madrid', 'Salta'];

    constructor() {
        //TODO: leer DB si existe
    }

    async city( place = ''){
        //petition http
        try {
            const resp = await axios.get('https://reqres.in/api/users?page=2');
            console.log('Axios',resp);
            return[]; //returno place equal    
        } catch (error) {
            console.log('No se encontro nada: ', error);
            return [];
        }
    }

}

module.exports = Searchs;