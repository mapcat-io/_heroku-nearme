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
        file : 'public/data/mapcat_test.csv',
        upsert : true,
        upsertFields: ['Mapcat ID'],
        drop : false,
        headerLine: true
      },
      {
        name : 'things_prototype',
        type : 'csv',
        file : 'public/data/mapcat_test_1.csv',
        upsert : true,
        upsertFields: ['Mapcat ID'],
        drop : false,
        headerLine: true
      }
    ]
  }
};
