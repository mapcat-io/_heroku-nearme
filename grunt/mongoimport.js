// attempts to replicate the command:
// mongoimport -h ds149175-a0.mlab.com:49175 -d heroku_0dg6nvlh -c items -u heroku_prod -p k4T2tFOci9 --upsert --upsertFields ['csvId'] --file public/data/master/items/csv-food-services-yelp-master-01.csv --type csv --headerline --batchSize 100 --numInsertionWorkers 500


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
      // Primary CSV upsert files
      {
        name : 'items',
        type : 'csv',
        file : 'public/data/master/items/csv-food-master.csv',
        upsert : true,
        upsertFields: ['csvId'],
        drop : false,
        headerLine: true
      },
    ]
  }
};
