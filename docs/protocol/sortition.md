![alt medium |>][sortition-illustration]

In Witnet, the entire network of nodes does not execute every task assigned to the network. Instead, per-task random committees composed of a subset of all available nodes are selected to perform each task. In order to be selected for one of these committees, each peer must first "discover" whether it is eligible. This eligibility method - somewhat comparable to someone finding out whether they hold a winning lottery ticket - is usually referred to as a "cryptographic sortition scheme".

Typically, cryptographic sortition schemes base eligibility on whether the randomly drawn number falls below a given target value. In this case, probability of eligibility depends on the target value; the higher the value, the higher the odds that peers will be eligible. In Witnet, the probability of being eligible is biased by a node's reputation - by how "honestly" it has behaved in previous tasks. The cryptographic sortition in Witnet is defined as follows:

<p style="text-align:center;">
<img src="https://latex.codecogs.com/gif.latex?VRF(t&space;||&space;rand(t)&space;||&space;task_{id})_{M_i}/2^L&space;\leq&space;I^t_i" title="VRF(t || rand(t) || task_{id})_{M_i}/2^L \leq I^t_i" ="center" />
</p>

VRF refers to the deterministic output of a Verifiable Random Function algorithm performed with key M<sub>i</sub>, and I<sub>i</sub><sup>t</sup> refers to the influence (in terms of reputation) of peer i at time t. The task id represents the task which the node is trying to be eligible for. 

As specified, if the VRF output falls below the target value, then the node is eligible to perform the task. Each peer can individually determine its sortition without interacting with any other peer in the network. The random value is common to all peers (using the VRF random output of the last block).

There are several properties that a cryptographic sortition needs to fullfil. The utilization of Verifiable Random Functions to select committees offers us the following properties:

- **Collision resistance** - its difficult to discover two inputs that map to the same output.
- **Pseudorandomness** - the output is indistinguishable from random by anyone without the secret key.
- **Trusted uniqueness** - with a public key, a VRF input m corresponds to a unique output β.
- **Verifiability** - with a public key and a VRF output, nodes can verify whether the VRF was computed correctly.

For more information on VRFs please check our [medium post][sortition-post].

!!! tip
    VRFs offer all the properties we needed for our cryptographic sortition mechanisms. If instead an ECDSA signature plus hash scheme was utilized, nodes could run their lottery as many times as they wanted (since ECDSA does not offer verifiable determinism properties).

 [sortition-illustration]: ../assets/images/sortition.svg
 [sortition-post]: https://medium.com/witnet/cryptographic-sortition-in-blockchains-the-importance-of-vrfs-ad5c20a4e018
