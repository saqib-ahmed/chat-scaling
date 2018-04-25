# chat-scaling
This application is a demonstration to show how web-sockets can be made to work with multiple replicas of a chat application in  a scalable environment. It is inspired by [this](https://github.com/john-pettigrew/scaling-socket-io-talk) repository with some modifications in front end design and with actual compose file for `docker stack deploy ..`. 

Socket.io is extremely powerful when it comes to communicating between the browser and a server in real-time. However, the problem of scaling quickly arises with the situations of very high numbers of clients or the need to implement load balancing. This problem can be easily and effectively addressed with RabbitMQ. This method also allows for a very extendable architecture when the project's goals inevitably grow and/or change. We will go over some quick basics for these tools as well as extend an existing chat application to use RabbitMQ and multiple node processes. 

## Socket.io
[Socket.io](http://socket.io/) is a library that implements the websocket protocol. Websockets are meant for two way communication and are often used between a server and a web browser. This is a sharp contrast to the standard way a browser communicates with a server. Typically, a web browser makes requests over ‘http’ or ‘https’ and the server responds. When you type in “https://google.com” there is a server that receives your browser’s request and does its best to send back a document. Data (such as JSON) can be sent over AJAX requests. This requires the web browser to ask for the information. If the browser needs to wait for new information, it has to poll and ask the server for the updated information every X number of seconds.

With websockets however, communication is free to take place between a web browser and a server. This means that the server can push information to the web browser and vice versa. This type of communication is great for chat apps, simple games, and real time dashboards.

## RabbitMQ
[RabbitMQ](https://www.rabbitmq.com/) is a message queue. There are many models for building applications that use RabbitMQ. Just take a look at [their tutorials](https://www.rabbitmq.com/getstarted.html) for some samples. For example, you might use the worker model for a web application that has some long running task like resizing an image. The RabbitMQ server can even implement acknowledgments to make sure the resize completes even if the worker process crashes mid way through completing. It can simply route the job to another worker. However, I won’t be covering acknowledgments in this post.

In this post, our chat application will use a publish and subscribe model. We will use it to send to and listen for messages from our chat application. Our chat servers will not need to know about each other. They will only need to know the IP address of RabbitMQ. RabbitMQ also offers a nice web UI and allows for clustering if our application ever requires it. Our application acts as a “producer” when it sends messages to RabbitMQ. These messages are sent to an exchange. This exchange routes messages to queues and then our application acts as a “consumer” and reads them.

producer -> exchange -> queue -> consumer

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
