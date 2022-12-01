
require('colors');
const inquirer = require('inquirer') ;



const menuOpts= [
    {
        type: 'list',
        name: 'opcion',
        message:'¿Que desea hacer?',
        choices: [{
            value: 1,
            name: `${'1.'.green} Buscar ciudad`
        },
        {
            value: 2,
            name: `${'2.'.green} Historial`
        },    
        {
            value: 0,
            name: `${'0.'.green} Salir`
        }  
    ]
    }
];

const inquirerMenu = async () => {

    console.log('==========================='.green);
    console.log('   Seleccione una opción'.white);
    console.log('===========================\n'.green);
   
    const { opcion } = await inquirer.prompt(menuOpts);
   
    return opcion;
  };

const pausa = async () => {
    
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${'ENTER'.bgYellow} to continue...`
        }
    ];

    await inquirer.prompt(question);
}

const leerInput = async (message) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ){
                if( value.length === 0) {
                    return ' Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);

    return desc
}

const listPlaces = async (places = []) => {

    const choices = places.map( ( place, i ) => {
        const { id, name } = place;
        idx = `${i+ 1}.`.green;
        return {
            value: id,
            name: `${idx} ${name}`
        }
    })

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })
    
    const question = [
        {
            type: 'list',
            name: 'id',
            message: 'Select place: ',
            choices
        }
    ]

    const { id } = await inquirer.prompt(question);


    return id;
}



const confirmar = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const { ok } = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoCheckList = async( tareas = [] ) => {
    const choices = tareas.map( (tarea, i) => {
        const { id, desc} = tarea;
        idx = `${i+ 1}.`.green;
        return{
            value: id,
            name: `${idx} ${desc}`,
            checked: (tarea.completado) ? true: false
        }
    })

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]
    const { ids } = await inquirer.prompt(pregunta);

    return ids
}
   
module.exports = { 
    inquirerMenu,
    pausa,
    leerInput,
    confirmar,
    mostrarListadoCheckList,
    listPlaces
    
 };
  
  