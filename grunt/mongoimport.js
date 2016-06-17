// attempts to replicate the command:
// mongoimport -h ds029224.mlab.com:29224 -d heroku_qtmrm6hs -c things_prototype -u rustyritz -p J3nnifer --file mapcat_test.csv --type csv --headerline

module.exports = {
  options: {
    db : 'heroku_qtmrm6hs',
    host : 'ds029224.mlab.com', //optional
    port: '29224', //optional
    username : 'rustyritz', //optional
    password : 'J3nnifer',  //optional
    stopOnError : false,  //optional
    // rootdir: 'public/data/',
    collections : [
      {
        name : 'things_prototype',
        type : 'csv',
        file : 'public/data/Curry-Up-Now.csv',
        upsert : true,
        upsertFields: ['Mapcat ID'],
        drop : false,
        headerLine: true
      },
      {
        name : 'things_prototype',
        type : 'csv',
        file : 'public/data/La-Oaxaquena.csv',
        upsert : true,
        upsertFields: ['Mapcat ID'],
        drop : false,
        headerLine: true
      },
      {
        name : 'things_prototype',
        type : 'csv',
        file : 'public/data/Little-Chihuahua.csv',
        upsert : true,
        upsertFields: ['Mapcat ID'],
        drop : false,
        headerLine: true
      },
      {
        name : 'things_prototype',
        type : 'csv',
        file : 'public/data/Mission-Grocery-Liquor.csv',
        upsert : true,
        upsertFields: ['Mapcat ID'],
        drop : false,
        headerLine: true
      },
      {
        name : 'things_prototype',
        type : 'csv',
        file : 'public/data/Morning-Due-Cafe.csv',
        upsert : true,
        upsertFields: ['Mapcat ID'],
        drop : false,
        headerLine: true
      },
      {
        name : 'things_prototype',
        type : 'csv',
        file : 'public/data/Taqueria-El-Castillito.csv',
        upsert : true,
        upsertFields: ['Mapcat ID'],
        drop : false,
        headerLine: true
      },
      {
        name : 'things_prototype',
        type : 'csv',
        file : 'public/data/The-Sycamore.csv',
        upsert : true,
        upsertFields: ['Mapcat ID'],
        drop : false,
        headerLine: true
      },
      {
        name : 'things_prototype',
        type : 'csv',
        file : 'public/data/Turners-Kitchen.csv',
        upsert : true,
        upsertFields: ['Mapcat ID'],
        drop : false,
        headerLine: true
      },
      {
        name : 'things_prototype',
        type : 'csv',
        file : 'public/data/Wan-Kee-Restaurant.csv',
        upsert : true,
        upsertFields: ['Mapcat ID'],
        drop : false,
        headerLine: true
      },
      {
        name : 'things_prototype',
        type : 'csv',
        file : 'public/data/Hoffmanns-Grill.csv',
        upsert : true,
        upsertFields: ['Mapcat ID'],
        drop : false,
        headerLine: true
      },
      {
        name : 'things_prototype',
        type : 'csv',
        file : 'public/data/Aster.csv',
        upsert : true,
        upsertFields: ['Mapcat ID'],
        drop : false,
        headerLine: true
      },
      {
        name : 'things_prototype',
        type : 'csv',
        file : 'public/data/Tuba.csv',
        upsert : true,
        upsertFields: ['Mapcat ID'],
        drop : false,
        headerLine: true
      },
      {
        name : 'things_prototype',
        type : 'csv',
        file : 'public/data/The-Liberties.csv',
        upsert : true,
        upsertFields: ['Mapcat ID'],
        drop : false,
        headerLine: true
      },
      {
        name : 'things_prototype',
        type : 'csv',
        file : 'public/data/Kiji-Sushi.csv',
        upsert : true,
        upsertFields: ['Mapcat ID'],
        drop : false,
        headerLine: true
      },
    ]
  }
};
