const { leerInput, inquirerMenu, pausa } = require("./helpers/inquirer");
const Searchs = require("./models/searchs");
require('dotenv').config();



const main  = async () =>{

    const searchs = new Searchs();
    let opt;

    do {
        opt = await inquirerMenu();
        console.log(opt);
        switch (opt) {
            case 1:
                //Mostrar msj
                const place = await leerInput('Enter city');
                //Buscar los lugares
                const selectionCitys = await searchs.city(place);
                //Seleccionar el lugar
                console.log(selectionCitys);

                //Datos clima

                //Mostrar resultados
                console.log('\nInfromacion de la ciudad\n'.green);
                console.log('Ciudad:',place)
                console.log('Lat:',)
                console.log('Lng:',)
                console.log('Temperatura:',)
                console.log('Mínima:',)
                console.log('Máxima:',)
                break;
            case 2:
                
                break;

        }
        if (opt !== 0) await pausa();
        
    } while (opt!==0);
}


main();