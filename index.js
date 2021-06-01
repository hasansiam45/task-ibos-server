const express = require('express')
const app = express()
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');



require('dotenv').config();
const port = process.env.PORT || 5000;





const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://neamot:ara2020@cluster0.pqklg.mongodb.net/ibos?retryWrites=true&w=majority";

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    console.log(err)
    const userCollection = client.db("ibos").collection("userInfo");
      
    
          app.get('/users', (req, res) => {
            userCollection.find()
                .toArray((err, users) => {
                    console.log(users)
                    console.log(err)
                    res.send(users)
                })
        })
    
    
    
            app.post('/addUsers', (req, res) => {
                const newUser = req.body;
                
                userCollection.insertOne(newUser)
                .then(result => {

                    res.send(result.insertedCount > 0)
                })
                .then(err => {
                    console.log(err)
                })
        })


           app.delete('/delete/:id', (req, res) => {
           const id = ObjectId(req.params.id)
           console.log(id)
           userCollection.deleteOne({
                   _id: id
               })
               .then(result => {
                   console.log(result)
               }).catch(err => console.error(`Delete failed with error: ${err}`))
       })

//   client.close();
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
