# Run Witnet as a docker-compose service

### Prerequisites

* Install the current stable release of Docker Compose:

```
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

* Install the current stable release of parallel:

```
sudo apt install parallel
parallel --citation
```

* Test the installation of Docker Compose:

```
docker-compose --version
```

* Clone the project's GitHub repository into your home directory:

```
cd
git clone https://github.com/witnet/witnet-operator-tools.git
```

### Go in the directory you are interested in

#### for only one node

```
cd witnet-operator-tools/docker/compose/bertux-operator-stable/
```

#### for several nodes (example: 5)

```
cd witnet-operator-tools/docker/compose/bertux-operator-5/
```

### Usage of docker-compose

* Start up the service:

```
docker-compose up -d
```

* Follow the logs of the service:

```
docker-compose logs -f
```

* When you want to stop the service:

```
docker-compose stop
```

* When you want to remove the service:

```
docker-compose down
```

* Every time you change the `docker-compose.yaml` file, you need to recreate the services by `docker-compose`:

```
docker-compose down
docker-compose up -d
```
