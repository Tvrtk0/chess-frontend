import * as mongoDB from 'mongodb'

const uri = process.env.MONGODB_URI

let client: mongoDB.MongoClient
let clientPromise: Promise<mongoDB.MongoClient>

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local')
}

client = new mongoDB.MongoClient(uri || '')
clientPromise = client.connect()

export default clientPromise
