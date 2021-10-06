const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database");
const games = require("./Games");

connection.authenticate()
.then(()=>{
    console.log("Conexão feita com sucesso!")
}).catch((msgerro)=>{
    console.log(msgerro);
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.get("/games",(req,res)=>{
    res.statusCode = 200;
    games.findAll().then(game =>{
        res.json(game);
    })
});

app.get("/games/:id",(req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        let id = parseInt(req.params.id);
        games.findByPk(id).then(game=>{
            if(game != undefined){
                res.statusCode = 200;
                res.json(game);
            }else{
                res.sendStatus(404);
            }
        })
    }
});

app.post("/games",(req,res)=>{
    const {title, year, price} = req.body;
    games.create({
        title: title,
        year: year,
        price: price,
    }).then(()=>{
        res.sendStatus(200);
    })
});

app.delete("/games/:id",(req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        let id = parseInt(req.params.id);
        games.destroy({
            where:{
                id:id
            }
        }).then(()=>{
            res.sendStatus(200);
        }).catch(()=>{
            res.sendStatus(404);
        })
    }
});

app.put("/games/:id",(req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        let id = parseInt(req.params.id);
        const {title, year, price} = req.body;
        games.findByPk(id).then((game)=>{
            if(game != undefined){
                game.update({
                    title: title,
                    year: year,
                    price: price
                })
                res.sendStatus(200);
            }
        }).catch((erro)=>{
            res.sendStatus(404);
        })
    }
})

app.listen(45678,(erro)=>{
    console.log("app rodando!")
});