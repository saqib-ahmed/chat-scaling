[![](https://images.microbadger.com/badges/image/saqibahmed515/chat:1.0.svg)](https://microbadger.com/images/saqibahmed515/chat:1.0 "Get your own image badge on microbadger.com")
[![](https://images.microbadger.com/badges/version/saqibahmed515/chat:1.0.svg)](https://microbadger.com/images/saqibahmed515/chat:1.0 "Get your own version badge on microbadger.com")
[![](https://images.microbadger.com/badges/commit/saqibahmed515/chat:1.0.svg)](https://microbadger.com/images/saqibahmed515/chat:1.0 "Get your own commit badge on microbadger.com")
# chat-scaling
This application is a demonstration to show how web-sockets can be made to work with multiple replicas of a chat application in  a scalable environment. It is inspired by [this](https://github.com/john-pettigrew/scaling-socket-io-talk) repository with some modifications in front end design and with actual compose file for `docker stack deploy ..`. 

Socket.io is extremely powerful when it comes to communicating between the browser and a server in real-time. However, the problem of scaling quickly arises with the situations of very high numbers of clients or the need to implement load balancing. This problem can be easily and effectively addressed with RabbitMQ. This method also allows for a very extendable architecture when the project's goals inevitably grow and/or change. 

### Getting the Image
To get the docker image from docker hub, execute following command:

`docker pull saqibahmed515/chat:1.0`

### Deploy
To deploy the image with [rabbitMQ](https://hub.docker.com/_/rabbitmq/) and [visualizer](https://hub.docker.com/r/dockersamples/visualizer/), you must have a swarm initialized with

`docker swarm init`

A single node swarm will serve the purpose of demonstration. Then simply execute

`docker stack deploy -c docker-compose.yml test`

It will start the chat application at port `3000`. You can see the visualizer at port `8080`. It will take around 10-20 seconds for the whole stack to become fully available. To see the services' status, execute

`docker service ls`

### Building the Image from the Code
In the project's root directory, run following commands to get the dependencies resolved.

`npm install`

`bower install`

Then copy the resulting directory `bower_components` in the [public](https://github.com/saqibahmed515/chat-scaling/tree/master/public) folder if it isn't loaded there already.

Finally execute following command to build the image:

`docker build -t saqibahmed515/chat:1.0 .`

### Demo
You can see the demonstration of the chat from different host containers in following animation:
<p align="center">
<img src="https://github.com/saqibahmed515/chat-scaling/blob/master/demo/chat-scaling.gif">
</p>

The deployment has following components in this case:

<p align="center">
<img src="https://github.com/saqibahmed515/chat-scaling/blob/master/demo/visualizer.png" width="30%" height="50%"></p>
