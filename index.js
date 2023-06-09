const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.port || 5000;

// middleware

app.use(cors());
app.use(express.json());

// coffeemaker
// FFLh5zgaeFKh0pZa

// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASSWORD);

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qnkpdci.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const coffeeCollections=client.db('coffeeDB').collection('coffee');
    app.get('/coffee',async(req,res)=>{
      const cursor =coffeeCollections.find();
      const result = await cursor.toArray();
      res.send(result);
    })
    app.post('/coffee',async(req,res)=>{
      const NewCoffee=req.body;
      console.log(NewCoffee)
      const result =await coffeeCollections.insertOne(NewCoffee);
      res.send(result)
     })
     app.delete('/coffee/:id',async (req,res)=>{

     })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get("/", (req, res) => {
  res.send("coffee maker is running");
});

app.listen(port, () => {
  console.log(`coffee maker is running on port${port}`);
});
