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
      // Primary CSV upsert file
      {
        name : 'items',
        type : 'csv',
        file : 'public/data/dir/csv-items-master.csv',
        upsert : true,
        upsertFields: ['csvId'],
        drop : false,
        headerLine: true
      },
    ]
  }
};
