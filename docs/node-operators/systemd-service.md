# Run as `systemd` service

The `runner.sh` script automatically downloads and installs the latest version of the Witnet node software (`witnet-rust`). It can also be used to update to the latest version, since it will keep all the block chain data and the configuration file in the hidden `.witnet` directory.

For Testnet 7.3 and greater, the configuration file needs to be customized with the public IP and port of the node, which must be set at the `public_addr` field in `witnet.toml` .

* Install latest version of ca-certificates to download safely from GitHub:

```sh
sudo apt install ca-certificates
sudo update-ca-certificates
```

* Create the `witnet` user dedicated to running the node:

```sh
sudo adduser witnet
```

* Clone the project's GitHub repository into your home directory and enter it:

```sh
cd
git clone https://github.com/witnet/witnet-operator-tools.git
cd witnet-operator-tools
```

* Install latest version with the `witnet` user dedicated to running the node:

```sh
sudo -u witnet ./systemd/runner.sh
```

* Copy the `witnet.service` file into `/lib/systemd/system/`:

```sh
sudo cp systemd/witnet.service /lib/systemd/system/witnet.service
```

* Every time you change the `witnet.service` file, you need to reload the `systemd` daemon:

```sh
sudo systemctl daemon-reload
```

* Enable the service:

```sh
sudo systemctl enable witnet.service
```

* Start the service:

```sh
sudo systemctl start witnet.service
```

* See the logs of the service:

```sh
journalctl -f -u witnet.service
```

* When you want to restart the service:

```sh
sudo systemctl restart witnet.service
```
