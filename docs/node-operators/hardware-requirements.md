# Hardware requirements of running a Witnet node

Witnet mining uses a
[probabilistic **BFT-alike consensus algorithm**][consensus] — long
story short: **no Proof-of-Work is needed**. In addition, `witnet-rust`
is written in **Rust**, one of the most **performant and secure**
programming languages. When compiled, the resulting binary is tailored
to each specific platform, which guarantees **near-zero overhead**.

**The hardware requirements for running a full node are thus incredibly
low**. Obviously, the more resources you spare when provisioning your
machine, the better it will perform and the better it will stand the
test of time.

This is a quick checklist on what to look for:

- **A good amount of disk space** (something in the hundreds of GBs) is
  better for long term storage of the blockchain.
- **Any modern laptop or desktop** will run it flawlessly.
- Virtual private servers (VPS) should work too. Take into account
  however that **some cloud providers may restrict the use of blockchain
  protocols**. Also, your node may get [poor connectivity with the rest
  of the network because of bucketing][bucketing].
- **Raspberry Pis**, specially the *Pi 3 Model B* and *Pi 4 Model B*,
  are also supported and in our experience they are a great, inexpensive
  way of running a Witnet node. As a fun experiment, [a $15 Raspberry Pi
  Zero is capable of mining blocks on the Witnet Testnet][pizero].

[consensus]: https://witnet.io/about#consensus
[bucketing]: https://medium.com/witnet/the-p2p-bucketing-system-in-witnet-d893dce4b8c5
[pizero]: https://twitter.com/aesedepece/status/1105901233162866688
