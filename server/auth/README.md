# Authentication and authorisation service
AuthN differs from AuthZ as AuthN is used to authenticate user's identity and AuthZ is for authorising access to resourses. This service is providing one auth_token for identification and resourse as all services will run behind a gateway server and there's no need to define policy and grant access to different kind of users. The auth_token currently contains also the role which will allow some sort of restriction to team members versus team owner.

## List of commands

### Run node-express and mongodb containers using the following commands
    docker-compose up --build   // to build and run
    docker-compose up           // to run in shell
    docker-compose up -d        // to run in detached mode

### To view node logs from detached docker container
    docker logs -f auth_node_api_server
