# List of independant microservices
Multiple services are listed under the folder server. Each server is running using node express application in combination with separate mongo database. There's one docker-compose file located in server root directory; responsible to run all other services using one command as shown below. There are other commands available for monitoring logs for each service.


## List of commands

### Run node-express and mongodb containers using the following commands
    docker-compose up --build           // to build and run all services
    docker-compose up                   // to run all in shell
    docker-compose up -d --build        // to run all in detached mode

### To view node logs from detached docker container
    docker logs -f [service name]
    e.g.
    docker logs -f auth-service // to view node server logs

### To recreate one service while all services are built and ran in detach mode
    docker-compose up -d --force-recreate --no-deps [service name]
    e.g.
    docker-compose up -d --force-recreate --no-deps auth-service

### To enter mongo shell
    docker exec -it [container_id] sh   // to enter mongodb container shell
    mongo --version                     // to view mongodb version

### Exit from docker container without causing it to stop
    CTRL + P followed by CTRL + Q

