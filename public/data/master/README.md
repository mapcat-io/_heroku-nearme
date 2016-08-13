# Data Readme Doc

## Commands

*  mongoimport -h ds149175-a0.mlab.com:49175 -d heroku_0dg6nvlh -c items -u heroku_prod -p k4T2tFOci9 --upsert true --upsertFields ['csvId'] --file public/data/master/items/csv-food-services-yelp-master-01.csv --type csv --headerline --batchSize 100 --numInsertionWorkers 500
