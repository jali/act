# Profile service
User can update profile details and add avatar through this service

## List of commands

### Run node-express and mongodb containers using the following commands
    docker-compose up --build           // to build and run
    docker-compose up                   // to run in shell
    docker-compose up -d                // to run in detached mode

### To view node logs from detached docker container
    docker logs -f auth_node_api_server // to view node server logs

### To enter mongo shell
    docker exec -it [container_id] sh   // to enter mongodb container shell
    mongo --version                     // to view mongodb version

### Exit from docker container without causing it to stop
    CTRL + P followed by CTRL + Q


