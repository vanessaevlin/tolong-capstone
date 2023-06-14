const {loadJabar, loadJateng, loadSumsel, firstaid} = require('./user_model');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 7000;
app.use(express.json());
app.listen(PORT, () => console.log('Server running...'));

app.get('/',(req,res) => res.send('Successful Response'));

app.get('/search', (req,res)=>{
    const search = req.body.search;
    if(search == "Jawa Barat" ) { 
        res.send(loadJabar()); }
        else if(search == "Jawa Tengah"){
            res.send(loadJateng());
        } else if(search == "Sumatera Selatan"){
            res.send(loadSumsel());
        } else if(search == "First Aid"){
            res.send(firstaid());
        }else{
            res.status(400).json({msg : "Response Unsuccessful"});
        }
});