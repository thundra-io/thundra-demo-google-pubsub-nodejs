const { BigQuery } = require('@google-cloud/bigquery');

const bigquery = new BigQuery();

const dataset = bigquery.dataset('order');
const destinationTable = dataset.table('client-order');

const insertClientOrder = async (data) => {
    return (await destinationTable.insert(data));
}

module.exports = {
    insertClientOrder,
}