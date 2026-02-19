# Claims-Management

## Commands to init

### Run app dockerized
```
    # From root of repo init all services
    docker-compose up docker-compose.yml
```

### Run app locally
```
    # From root of repo init API
    cd apps/claims-api/ && npm run start

    # From root of repo init Front
    cd apps/claims-front/ && nom run start

    # From root of repo init DB
    docker-compose up docker-compose-db.yml
```



## To run unit tests coverage
```
    # From root of repo 
    cd apps/claims-api/ && npm run test:cov
```


