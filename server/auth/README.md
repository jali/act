# Authentication service

## List of commands

### Run node-express and mongodb containers using the following commands
    docker-compose up --build   // to build and run
    docker-compose up           // to run in shell
    docker-compose up -d        // to run in detached mode

### To view node logs from detached docker container
    docker logs -f auth_node_api_server
