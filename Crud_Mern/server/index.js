const express=require('express');
const cors=require('cors');
const app=express();
const mongoose=require('mongoose');
app.use(express.json());
app.use(cors());
const FoodModel=require('./models/Food')
mongoose.connect("mongodb://127.0.0.1:27017/CustomerDetail", 
    {   useNewUrlParser: true,
        useUnifiedTopology: true
    });

app.post('/insert',async (req,res)=>{
    const id=req.body.uniqueId;
    const Name=req.body.Name;
    const Age=req.body.Age;
    const food=new FoodModel({uniqueId:id,Name : Name,Age:Age});
    try {
        await food.save();
        res.send("Data Inserted")
    } catch (error) {
        res.send(error);
    }
});
app.post('/delete', async (req, res) => {
    const id = req.body.uniqueId;
    console.log(id);
    try {
      const deletedFood = await FoodModel.findOneAndDelete({ uniqueId: id });
      res.send(`Deleted food: ${deletedFood}`);
    } catch (error) {
      console.error(error);
    }
  });
app.put('/update',(req,res)=>{
    const id=req.body.uniqueId;
    const Name=req.body.Name;
    const Age=req.body.Age;
    FoodModel.findOne({ uniqueId: id }).then((document) => {
        if(Name){
            document.Name=Name;
        }
        if(Age){
            document.Age=Age;
        }
        document.save();
      })
      .catch((err) => console.error('Error finding document:', err));
});
app.get('/read', async (req, res) => {
    try {
      const data = await FoodModel.find({  });
      console.log(data);
      res.send(data);
    } catch (err) {
      console.error(err);
    }
  });
app.listen(3001,()=>{
    console.log("Server is Running");
});