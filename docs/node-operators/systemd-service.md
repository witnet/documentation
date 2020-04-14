# Run as `systemd` service

* Create the `witnet` user dedicated to running the node:

```
sudo adduser witnet
```

* Install latest version with the `witnet` user dedicated to running the node:

```
sudo -u witnet ./systemd/runner.sh
```

* Copy the `witnet.service` file into `/lib/systemd/system/`:

```
sudo cp systemd/witnet.service /lib/systemd/system/witnet.service
```

* Every time you change the `witnet.service` file, you need to reload the `systemd` daemon:

```
systemctl daemon-reload
```

* Enable the service:

```
systemctl enable witnet.service
```

* Start the service:

```
systemctl start witnet.service
```

* See the logs of the service:

```
journalctl -f -u witnet.service
```

* When you want to restart the service:

```
systemctl restart witnet.service
```


