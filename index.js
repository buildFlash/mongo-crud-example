const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dbUrl = `mongodb://localhost:27017`;
const dbName = `streams`;

const mongoClient = new MongoClient(dbUrl);

mongoClient.connect((err) => {
    assert.strictEqual(null, err);
    console.log(`Connected successfully to mongodb`);
    const db = mongoClient.db(dbName);
    insertDocument(db, () => {
        mongoClient.close()
    })
    mongoClient.close();
})

const insertDocument = (db, callback) => {
    const collection = db.collection(`documents`);

    collection.insertMany([
        {a : 1}, {a : 2}, {a : 3}
    ], (err, result) => {
        assert.strictEqual(null, err);
        assert.strictEqual(result.result.n, 3);
        assert.strictEqual(result.ops.length, 3);
        console.log(`Inserted 3 documents into the collection`)
        callback(result);
    })
}
