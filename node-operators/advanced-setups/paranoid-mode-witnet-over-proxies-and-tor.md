---
description: >-
  How to make your Witnet node resolve data requests over multiple network
  proxies to protect itself from potential reputation loss and slashing.
---

# Paranoid mode (Witnet over proxies and Tor)

Witnet-Rust now supports an opt-in functionality called _**paranoid mode**_. This mode protects nodes from being targetted by ill-intended data requests that may harm their reputation score and steal part of their collateralized Wit coins.

When a node is in paranoid mode, in addition of performing data retrieval through its regular network interface, it will also perform the retrieval over one or more network proxies. Only if the result is consistent across all the proxies, it will proceed to submit a commitment as a response to the request.

Several proxy protocols are supported. This includes Tor, which is probably the most reliable and easy-to-setup proxying solution.

For the extremely privacy-conscious, the paranoid mode allows also to disable the regular network interface, so that data retrieval can never leak their clearnet _IP address_.

## Supported proxy protocols

The currently supported proxy protocols are:

| Protocol          | Supports authentication | URL example                |
| ----------------- | ----------------------- | -------------------------- |
| http              | ❌                       | http://example.com:3128    |
| https             | ❌                       | https://example.com:3128   |
| socks4            | N/A                     | socks4://127.0.0.1:1080    |
| socks4a           | N/A                     | socks4a://example.com:1080 |
| socks5            | ❌                       | socks5://127.0.0.1:1080    |
| socks5h           | ❌                       | socks5h://example.com:1080 |
| tor (over socks5) | ❌                       | socks5://127.0.0.1:9050    |

{% hint style="info" %}
Authentication support may be added in a future release of `witnet-rust` if there is demand for it.
{% endhint %}

## Configuration

Paranoid mode is configured through the `witnet.toml` configuration file of your node. By default, this file can be found in the following location in your file system:

{% tabs %}
{% tab title="GNU/Linux and MacOS" %}
```
/.witnet/config/witnet.toml
```
{% endtab %}

{% tab title="Windows" %}
```
%USERPROFILE%\.witnet\
```
{% endtab %}
{% endtabs %}

The settings that are relevant to the paranoid mode can be found in the `[witnessing]` section of the `witnet.toml` file:

{% code title="~/.witnet/config/witnet.toml" %}
```toml
[witnessing]
proxies = []
paranoid_percentage = 51
allow_unproxied = true
```
{% endcode %}

{% hint style="info" %}
If the `[witnessing]` section does not exist in your configuration file, you can simply create it by copying and pasting these lines at the end of `witnet.toml`.
{% endhint %}

### `proxies`

The `proxies` setting expects a list of addresses to be used as proxies when performing data retrieval. These need to include full scheme, URL and port (you have some examples in the [Supported proxy protocols](paranoid-mode-witnet-over-proxies-and-tor.md#supported-proxy-protocols) table above).

{% code title="~/.witnet/config/witnet.toml" %}
```toml
[witnessing]
proxies = [
    "http://example.com:3128",
    "socks4://example.com:1080",
    "socks5://localhost:9050",
]
```
{% endcode %}

If this setting is not found in the configuration file, paranoid mode is disabled.

### `paranoid_percentage`

The `paranoid_percentage` setting adjusts how strict or lenient to be with inconsistent data sources. Paranoid level is defined as the percentage of successful retrievals over total number of retrieval transports. That is, if we have 3 proxies in addition to the default unproxied transport (4), and we set the paranoid percentage to 51 (51%), the node will only refrain from commiting to requests in which "half plus one" of the data sources are in consensus (3 out of 4).

{% code title="~/.witnet/config/witnet.toml" %}
```toml
[witnessing]
proxies = [
    // add proxy addresses here
]
paranoid_percentage = 66
```
{% endcode %}

If this setting is not found in the configuration file, the default percentage value is 51%.

### `allow_unproxied`

The `allow_unproxied` setting enables or disables the default unproxied HTTP transport so as to protect the _clearnet_ IP address of a witnessing node. This feature can only be active if the address of at least one retrieval proxy is provided.

This extreme form of the paranoid mode is enabled by setting `allow_unproxied` to `false`.

{% code title="~/.witnet/config/witnet.toml" %}
```toml
[witnessing]
proxies = [
    // add proxy addresses here
]
allow_unproxied = false
```
{% endcode %}

If this setting is not found in the configuration file, it defaults to `true`, i.e. unproxied witnessing is allowed as usual.

## Recommendations and best practices

### Public proxy servers (at your own risk!)

There are plenty of publicly accessible HTTP, HTTPS, SOCKS4 and SOCKS5 proxy servers that anyone can use for free. Their addresses are regularly collected and listed on websites like these:

* [Spys.one](https://spys.one/en/)
* [FreeProxyLists](https://www.freeproxylists.net/)
* [ProxyNova](https://www.proxynova.com/proxy-server-list/)
* [Geonode](https://geonode.com/free-proxy-list/)

While there are thousands of different proxy addresses you can choose from, finding a good one is a bit hit or missit often takes a lot of trial and error. Public proxies also tend to be very slow and can go down unadvertedly at any time. In general terms, they are not reliable enough for the witnessing activity of a Witnet node. Other options such as premium SOCKS5 proxy services and Tor are much preferable.

### Premium SOCKS5 proxy services (recommended)

Some VPN providers offer premium SOCKS5 proxy services that perform much better than those that you can use for free. These are some good options:

* [NordVPN](https://nordvpn.com/)
* [IPVanish](https://www.ipvanish.com)
* [PrivateVPN](https://privatevpn.com/)
* [PrivateInternetAccess](https://www.privateinternetaccess.com)
* [Hide.me](https://hide.me)

The only downside to premium proxy services is that, unless you are already using one of those for your regular browing, you will have to pay a subscription. Moreover, if you want to use several of these for optimum results, the cost may be significant. If you just want to add one proxy and prefer not to pay any subscription services, the Tor proxy explained below could be the best option for you.

### Tor over SOCKS5 (recommended)

By default, every Tor client normally exposes a SOCKS5 interface that can be used to tunnel network traffic through the Tor network.&#x20;

If you are running your Witnet node using Docker, setting up another Docker container that will run  a Tor proxy on the same machine can be as simple as it gets:

{% tabs %}
{% tab title="GNU/Linux and MacOS" %}
{% code overflow="wrap" %}
```
docker run -d \
    --name tor-socks-proxy \
    --publish 9150:9150 \
    --restart always \
    peterdavehello/tor-socks-proxy
```
{% endcode %}
{% endtab %}

{% tab title="Windows" %}
{% code overflow="wrap" %}
```
docker run -d --name tor-socks-proxy --publish 9150:9150 --restart always peterdavehello/tor-socks-proxy
```
{% endcode %}
{% endtab %}
{% endtabs %}

For non-containerized setups, here is a [detailed guide](https://medium.com/@herman.daniel/create-tor-sock5-proxy-on-your-local-network-b85d43f96d7b) on how to run a Tor Socks5 proxy on a Debian or Ubuntu server.
