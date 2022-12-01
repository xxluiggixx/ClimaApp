const { leerInput, inquirerMenu, pausa, listPlaces } = require("./helpers/inquirer");
const Searchs = require("./models/searchs");
require('dotenv').config();



const main  = async () =>{

    const searchs = new Searchs();
    let opt;

    do {
        opt = await inquirerMenu();
        
        switch (opt) {
            case 1:
                //Mostrar msj
                const place = await leerInput('Enter city');
                //Buscar los lugares
                const selectionCitys = await searchs.city(place);
                /*Seleccionar el lugar
                {
                    id: 'poi.678604892979',
                    name: 'Saltabarranca, Saltabarranca, Veracruz 95480, México',
                    lng: -95.533188,
                    lat: 18.589543
                },
                */
                const selectedPlace = await listPlaces(selectionCitys);
                if(selectedPlace === '0') continue;

                const { lng, lat, name } = selectionCitys.find( city => city.id === selectedPlace);
                //Guardar en DB
                searchs.addHistory(name);
                //Datos clima
                const { temp, temp_max,temp_min, description } = await searchs.currentWeather(lat,lng);
                //Mostrar resultados
                console.log('\n============== Infromacion de la ciudad ==============\n'.green);
                console.log('Ciudad:',name.green);
                console.log('Lat:',lat);
                console.log('Lng:',lng);
                console.log('Temperatura:',temp);
                console.log('Mínima:',temp_min);
                console.log('Máxima:',temp_max);
                console.log('Como está el clima:',description)
                break;
            case 2:
                searchs.capitalLetter
                    .forEach((place, i) => {
                    const idx = `${i +1}.`.green;
                    console.log(`${idx} ${place}`);
                })
                break;

        }
        if (opt !== 0) await pausa();
        
    } while (opt!==0);

    
}


main();