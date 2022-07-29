# Authentication and authorisation service
AuthN differs from AuthZ as AuthN is used to authenticate user's identity and AuthZ is for authorising access to resourses. In this example we're going to use one auth-token for identification and resourse as we don't have massive amount of services that need to define policy and grant access to different kind of users. The auth-token currently contains also the role which will allow some sort of restriction to team memebers versus team owner.

## List of commands

### Run node-express and mongodb containers using the following commands
    docker-compose up --build   // to build and run
    docker-compose up           // to run in shell
    docker-compose up -d        // to run in detached mode

### To view node logs from detached docker container
    docker logs -f auth_node_api_server
