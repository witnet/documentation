# Run as `systemd` service

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
systemctl daemon-reload
```

* Enable the service:

```sh
systemctl enable witnet.service
```

* Start the service:

```sh
systemctl start witnet.service
```

* See the logs of the service:

```sh
journalctl -f -u witnet.service
```

* When you want to restart the service:

```sh
systemctl restart witnet.service
```
