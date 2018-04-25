[![](https://images.microbadger.com/badges/image/saqibahmed515/chat:1.0.svg)](https://microbadger.com/images/saqibahmed515/chat:1.0 "Get your own image badge on microbadger.com")
[![](https://images.microbadger.com/badges/version/saqibahmed515/chat:1.0.svg)](https://microbadger.com/images/saqibahmed515/chat:1.0 "Get your own version badge on microbadger.com")
# chat-scaling
This application is a demonstration to show how web-sockets can be made to work with multiple replicas of a chat application in  a scalable environment. It is inspired by [this](https://github.com/john-pettigrew/scaling-socket-io-talk) repository with some modifications in front end design and with actual compose file for `docker stack deploy ..`. 

Socket.io is extremely powerful when it comes to communicating between the browser and a server in real-time. However, the problem of scaling quickly arises with the situations of very high numbers of clients or the need to implement load balancing. This problem can be easily and effectively addressed with RabbitMQ. This method also allows for a very extendable architecture when the project's goals inevitably grow and/or change. 

## Build Image
To create an image execute following command in root directory of this project:

`docker build -t chat:1.0 .`

## Deploy
To deploy the image, you must have a swarm initialized with

`docker swarm init`

Then simply execute

`docker stack deploy -c docker-compose.yml test`

That's it. It will start the service at port `3000`. You can see the visualizer at port `8080`. To see the services running, execute

`docker service ls`
