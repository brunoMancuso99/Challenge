const cheerio = require('cheerio');
const extra = require('fs-extra');
const  Mongoose  = require('mongoose');
const requests = require('node-fetch');


//base de datos

const dbconnection =async() =>{

    try{
        await Mongoose.connect(process.env.mongodbconnection,
            {
                useNewUrlParser:true,
                useUnifiedTopology:true,
            });
            console.log('base de datos online');

        } catch(error) {
            console.log(error);
            throw new Error('Error al iniciar la base de datos');
        }
    }






Mongoose.connect('mongodb://localhost//scraping');

const datosModel = Mongoose.model('datos',{

    imagen: String,
    posicion: Int32Array,
    equipo: String,
    PJ: Int32Array,
    G:  Int32Array,	
    E:	Int32Array,
    P:	Int32Array,
    GF:	Int32Array,
    GC: Int32Array,
    DG: Int32Array,
    Pts: Int32Array,

});


// funcion scraping

async function init() {

    const $ = await requests({

        uri:'https://www.futbolargentino.com/primera-division/tabla-de-posiciones',
        transform: body => cheerio.load(body)
    });

    const posiciones = $('.d-none d-md-inline').each((i,el)=> {   // sigue la logica del for "el" es la cantidad de etiquetas con esa clase en la pagina
        
        const posicion = $(el).find('td.bg-color').text();
        const equipo = $(el).find('td.d-none d-md-table-cell').text();
        const PJ = $(el).find('td.d-none d-md-table-cell').text();
        const G = $(el).find('td.d-none d-md-table-cell').text();
        const E = $(el).find('td.d-none d-md-table-cell').text();
        const P = $(el).find('td.d-none d-md-table-cell').text();
        const GF = $(el).find('td.d-none d-md-table-cell').text();
        const GC = $(el).find('td.d-none d-md-table-cell').text();
        const DG = $(el).find('td.d-none d-md-table-cell').text();
        const Pts = $(el).find('td.d-none d-md-table-cell').text();

    const logo = $('a').each((i,el)=> { 

        const x = 0;
        const img =$(el).find('data-src').attr('scr');

        const file = fs.createWriteStream('img/'+x+'.jpg');

         new.datosModel ({

            imagen: x+'.jpg',
            posicion: posicion,
            equipo: equipo,
            PJ: PJ,
            G:  G,	
            E:	E,
            P:	P,
            GF:	GF,
            GC: GC,
            DG: DG,
            Pts: Pts,

        })

            x=x+1;
        });
     });
    
}

init();

