# Hardware requirements of running a Witnet node

Witnet mining uses a
[probabilistic **BFT-alike consensus algorithm**][consensus], so **no Proof-of-Work is necessary**. In addition, `witnet-rust`
is written in **Rust**, one of the most **performance-focussed and secure**
programming languages available. When compiled, the resulting binary is tailored
to each specific platform, which guarantees **near-zero overhead**.

**The hardware requirements for running a full node are therefore incredibly
low**. Obviously, the more resources you spare when provisioning your
machine, the better it will perform and the less likely you are to face problems.

This is a quick checklist on what to look for:

- **At least 4GB of RAM** to ensure your node does not crash during heavy network activity.
- **A good amount of disk space** (somewhere in the 100s of GBs) is
  better for long term storage of the blockchain. The chain is expected not to grow more than 75GB per year.
- **Any modern laptop or desktop** will run it flawlessly.
- Virtual private servers (VPS) should work too. [Here is a tutorial to set up a Witnet node on the popular VPS service, Digital Ocean][vpstutorial]. Take into account
  however that **some cloud providers may restrict the use of blockchain
  protocols**. Also, your node may get [poor connectivity with the rest
  of the network because of bucketing][bucketing], especially if you are running the node from a popular IP range (for example, from a well-known VPS service such as Digital Ocean).
- **Raspberry Pis**, especially the *Pi 4 Model B*,  are also supported and, in our experience, are a great, inexpensive
  way of running a Witnet node. [Here is a tutorial on how to set up a Witnet node on a Raspberry Pi][pitutorial].

[consensus]: https://witnet.io/about#consensus
[vpstutorial]: https://www.youtube.com/watch?v=qlo0D_2F7qw
[bucketing]: https://medium.com/witnet/the-p2p-bucketing-system-in-witnet-d893dce4b8c5
[pitutorial]: https://www.youtube.com/watch?v=He2vuLtFyns
[pizero]: https://twitter.com/aesedepece/status/1105901233162866688
