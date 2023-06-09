const {loadJabar, loadJateng, loadSumsel, firstaid} = require('./user_model.js');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.listen(PORT, () =>  console.log(`Server listening on port ${PORT}...`));

app.get('/',(req,res) => res.status(200).json({msg: 'Successful Response'}));

app.post('/search',(req,res)=>{
    const search = req.body.search;
    if(search == "Jawa Barat" || search == "West Java") { 
        res.status(200).json(loadJabar()); 
    }
        else if(search == "Jawa Tengah" || search == "Central Java"){
            res.status(200).json(loadJateng());
        } else if(search == "Sumatera Selatan" || search == "South Sumatera"){
            res.status(200).json(loadSumsel());
            } else if(search == "First Aid"){
                res.status(200).json(firstaid());
                }else{
                    res.status(400).json({msg : "Response Unsuccessful"});
        }
});
