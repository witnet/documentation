![alt medium |>][sortition-illustration]

In Witnet the entire set of nodes does not execute the tasks assigned to the network. Instead, per-task random commitees nodes composed by a subset of the nodes of the network are selected to perform each of the tasks. In order to enter one of those committees, they need to become "eligible" for such task. When the eligibility is discovered by each peer individually we usually refer to it as a cryptographic sortition scheme, i.e., the ability of discovering whether you are the winner of a “lottery” by yourself.

Usually cryptographic sortition schemes base their eligibility on the luck of getting a random number that falls below a given target value. The difficulty obviously depends on the target value; the higher the value is, the more chances peers have to become eligible. In Witnet the probability of becoming eligible is biased by how well nodes behaved in previous tasks. The cryptographic sortition in Witnet is defined as:

<p style="text-align:center;">
<img src="https://latex.codecogs.com/gif.latex?VRF(t&space;||&space;rand(t)&space;||&space;task_{id})_{M_i}/2^L&space;\leq&space;I^t_i" title="VRF(t || rand(t) || task_{id})_{M_i}/2^L \leq I^t_i" ="center" />
</p>

Where VRF refers to the deterministic output of a Verifiable Random Function algorithm performed with key M<sub>i</sub>, and I<sub>i</sub><sup>t</sup> refers to the influence (in terms of reputation) of peer i at time t. The task id represents the task to which the node is trying to become eligible for. Essentially, if the VRF output falls below the target value, then the node becomes eligible to perform the task. We observe how each peer can individually figure out its sortition without interacting with any other peer in the network. The random value is common to all peers as the hash of the previous block is used.

There are several properties that a cryptographic sortition needs to fullfil. The utilization of Verifiable Random Functions to select committees offers us the following properties:

- **Collision resistance**, i.e., its hard to find two inputs that map to the same output.
- **Pseudorandomness**, i.e., the output is indistinguishable from random by anyone not knowing the secret key.
- **Trusted uniqueness**, that requires that, given a public key, a VRF input m corresponds to a unique output β.
- **Verifiability**, given a public key and a VRF output proof nodes can verify whether the VRF was computed correctly.

For more information on VRFs please check our [medium post][sortition-post].

!!! tip
    VRFs offer all the properties we needed for our cryptographic sortition mechanisms. If instead an ECDSA signa ure plus hash scheme was utilized nodes could run their lottery as many times as they wanted, since ECDSA does not offer verifiable determinism properties.

 [sortition-illustration]: ../assets/images/sortition.svg
 [sortition-post]: https://medium.com/witnet/cryptographic-sortition-in-blockchains-the-importance-of-vrfs-ad5c20a4e018
