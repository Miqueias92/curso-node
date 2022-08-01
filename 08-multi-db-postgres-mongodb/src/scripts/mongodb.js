// docker ps
// docker exec -it 6f9df2f0c6f4 mongo --host localhost -u miqueias -p minhasenha --authenticationDatabase heroes

// databases
show dbs

// mudando o contexto para uma database 
use herois 

// mostrar as collections
show collections

db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
}) 


db.herois.find()
db.herois.find().pretty()

for (let i=0; i<= 100; i++) {
    db.heroes.insert({
        nome: `Clone-${i}`,
        poder: 'Velocidade',
        dataNascimento: '1998-01-01'
    })  
}

db.herois.count()

db.herois.findOne()

db.herois.find().limit(10).sort({nome: -1})

db.herois.find({}, {poder: 1, _id: 0 })

//create
db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

// read
db.herois.find()

// update 

// (atualiza o nome, mas as demais colunas são deletadas)
db.heroes.update({ _id: ObjectId("62e34e349d1f1f8d25b3e109")},
                { nome: 'Mulher Maravilha' })


// atualiza o nome, mas n deleta as demais colunas               
db.heroes.update({ _id: ObjectId("62e34e239d1f1f8d25b3e108")},
                { $set: { nome: 'Lanterna Verde' } } )


// delete                    
db.heroes.remove({}) 

db.heroes.remove({ nome: 'Mulher Maravilha' }) 