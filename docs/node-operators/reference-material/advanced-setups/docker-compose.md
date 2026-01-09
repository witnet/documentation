# 🐋 Run node with docker compose

### Prerequisites

* Make sure you have docker installed, newer versions comes bundled with docker compose
* Verify by running

```bash
docker-compose --version
```

### Deploy

#### Make a new directory & Create a docker-compose.yml file there

```yaml
networks:
  Node:

services:
  node:
    image: witnet/witnet-rust:<VERSION-HERE>
    container_name: node
    restart: always
    ports:
      - "21337:21337" # External Port
      # - "21338:21338" # JSON-RPC Port # Needs to be exposed in the witnet.toml
      # - "21339:21339" # HTTP Port # Needs to be exposed in the witnet.toml
      # - "21340:21340" # Websocket # Needs to be exposed in the witnet.toml
    environment:
      - LOG_LEVEL=INFO
    volumes:
      - "<REPLACE-ME-WITH-PATH>/node-data:/.witnet"
    logging:
      driver: json-file
      options:
        max-size: "100m"
```



* Make sure to replace the volume path with your desired path eg. `/home/ubuntu/witnet`
* It's also a good idea to limit your log file max size to avoid crashing the node from the overflowing logs

#### Start Service

```bash
docker compose up -d
```

#### Stop Service

```bash
docker compose down
```

#### Check the service logs

```bash
docker logs node -f
```



::: warning
Every time you edit the docker-compose.yml file to update you need to run `docker compose up -d`
:::
