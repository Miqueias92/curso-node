# Comando docker 

## criando banco de dados postgres

```
    docker run \
        --name postgres \
        -e POSTGRES_USER=miqueias \
        -e POSTGRES_PASSWORD=123 \
        -e POSTGRES_DB=heroes \
        -p 5432:5432 \
        -d \
        postgres
```

``` docker ps ```

``` docker exec -it postgres /bin/bash ```

### outra forma de acessar

``` docker exec -ti postgres psql -U miqueias heroes ```


### gerenciador adminer

``` 
    docker run \
        --name adminer \
        -p 8080:8080 \
        --link postgres:postgres \
        -d \
        adminer
```

## criando banco de dados mongodb

 ```
    docker run \
        --name mongodb \
        -p 27017:27017 \ 
        -e MONGO_INITDB_ROOT_USERNAME=admin \
        -e MONGO_INITDB_ROOT_PASSWORD=admin \
        -d \
        mongo:4
```

```
    docker run \
        --name mongoclient \
        -p 3000:3000 \
        --link mongobd:mongodb \
        -d \
        mongoclient/mongoclient
```        

``` criando usuário no monogodb ```

```
docker exec -it mongodb \
mongo --host localhost -u admin -p admin --authenticationDatabase admin \
--eval "db.getSiblingDB('heroes').createUser({user: 'miqueias', 'pwd': 'minhasenha', roles: [{role: 'readWrite', db: 'heroes'}]})"
```