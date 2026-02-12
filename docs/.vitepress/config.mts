import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'

type SidebarItem = {
  text: string
  link?: string
  items?: SidebarItem[]
  collapsed?: boolean,
}

const rawSidebar: SidebarItem[] = [
  {
    "text": "Introduction",
    "items": [
      {
        "text": "❓ What is Witnet?",
        "link": "intro/about/index.md",
        collapsed: true,
        "items": [
          {
            "text": "⚙️ Oracle Architecture",
            "link": "intro/about/architecture.md"
          },
          {
            "text": "🪙 The Witnet Coin ($WIT)",
            "link": "intro/about/the-witnet-coin-usdwit.md"
          },
          {
            "text": "👛 Witnet Wallets",
            "link": "intro/about/sheikah-witnet-wallet.md"
          },
          {
            "text": "🤔 Frequently Asked Questions",
            "link": "intro/about/frequently-asked-questions.md"
          },
          {
            "text": "😎 Awesome Witnet",
            "link": "intro/about/awesome-witnet.md"
          }
        ]
      },
      {
        "text": "💎 Why Witnet Rocks!",
        "link": "intro/why-witnet-rocks/index.md",
        // collapsed: true,
        // "items": [
        //   {
        //     "text": "Witnet: The Oracle Making Physical Infrastructure Trustless and Verifiable",
        //     "link": "intro/why-witnet-rocks/witnet-the-oracle-making-physical-infrastructure-trustless-and-verifiable.md"
        //   }
        // ]
      },
      {
        "text": "🐇 Quick Tutorials",
        "link": "intro/tutorials/index.md",
        collapsed: true,
        "items": [
          {
            "text": "📈 Using Witnet Price Feeds",
            "link": "intro/tutorials/data-feeds-tutorial.md"
          },
          {
            "text": "🎲 Using Witnet Randomness",
            "link": "intro/tutorials/randomness.md"
          },
          {
            "text": "🌐 Using Witnet Custom Feeds",
            "link": "intro/tutorials/apis-and-http-get-post.md"
          },
          {
            "text": "⛏️ Start Mining WIT Coins",
            "link": "intro/tutorials/mining-wit.md"
          }
        ]
      }
    ]
  },
  // {
  //   "text": "Smart Contracts Developers V2",
  //   "items": [
  //     {
  //       "text": "SMART CONTRACTS DEVELOPERS V2",
  //       "link": "smart-contracts-developers-v2/index.md",
  //       "items": [
  //         {
  //           "text": "🔮 Wit/Oracle",
  //           "link": "smart-contracts-developers-v2/wit-oracle/index.md",
  //           "items": [
  //             {
  //               "text": "Key features",
  //               "link": "smart-contracts-developers-v2/wit-oracle/key-features.md"
  //             },
  //             {
  //               "text": "Building data requests",
  //               "link": "smart-contracts-developers-v2/wit-oracle/building-data-requests.md"
  //             },
  //             {
  //               "text": "Parameterized templates",
  //               "link": "smart-contracts-developers-v2/wit-oracle/parameterized-templates.md"
  //             },
  //             {
  //               "text": "Querying data",
  //               "link": "smart-contracts-developers-v2/wit-oracle/querying-data/index.md",
  //               "items": [
  //                 {
  //                   "text": "PULL data updates",
  //                   "link": "smart-contracts-developers-v2/wit-oracle/querying-data/pull-data-updates.md"
  //                 },
  //                 {
  //                   "text": "PUSH data reports",
  //                   "link": "smart-contracts-developers-v2/wit-oracle/querying-data/push-data-reports.md"
  //                 }
  //               ]
  //             },
  //             {
  //               "text": "Decoding results",
  //               "link": "smart-contracts-developers-v2/wit-oracle/decoding-results.md"
  //             }
  //           ]
  //         },
  //         {
  //           "text": "🎲 Wit/Randomness",
  //           "link": "smart-contracts-developers-v2/wit-randomness/index.md",
  //           "items": [
  //             {
  //               "text": "Key features",
  //               "link": "smart-contracts-developers-v2/wit-randomness/key-features.md"
  //             },
  //             {
  //               "text": "Randomizing blocks",
  //               "link": "smart-contracts-developers-v2/wit-randomness/randomizing-blocks.md"
  //             },
  //             {
  //               "text": "Fetching randomness",
  //               "link": "smart-contracts-developers-v2/wit-randomness/fetching-randomness.md"
  //             },
  //             {
  //               "text": "Randomness traceability",
  //               "link": "smart-contracts-developers-v2/wit-randomness/randomness-traceability.md"
  //             }
  //           ]
  //         },
  //         {
  //           "text": "💹 Wit/Price Feeds",
  //           "link": "smart-contracts-developers-v2/wit-price-feeds/index.md",
  //           "items": [
  //             {
  //               "text": "Key features",
  //               "link": "smart-contracts-developers-v2/wit-price-feeds/key-features.md"
  //             },
  //             {
  //               "text": "Supported feeds",
  //               "link": "smart-contracts-developers-v2/wit-price-feeds/supported-feeds.md"
  //             },
  //             {
  //               "text": "Update conditions",
  //               "link": "smart-contracts-developers-v2/wit-price-feeds/update-conditions.md"
  //             },
  //             {
  //               "text": "Tracing data sources",
  //               "link": "smart-contracts-developers-v2/wit-price-feeds/tracing-data-sources.md"
  //             },
  //             {
  //               "text": "Reading last updates",
  //               "link": "smart-contracts-developers-v2/wit-price-feeds/reading-last-updates.md"
  //             },
  //             {
  //               "text": "Pushing price updates",
  //               "link": "smart-contracts-developers-v2/wit-price-feeds/pushing-price-updates.md"
  //             },
  //             {
  //               "text": "((Supported feeds))",
  //               "link": "smart-contracts-developers-v2/wit-price-feeds/supported-feeds-1/index.md",
  //               "items": [
  //                 {
  //                   "text": "Arbitrum Price Feeds",
  //                   "link": "smart-contracts-developers-v2/wit-price-feeds/supported-feeds-1/arbitrum-price-feeds.md"
  //                 }
  //               ]
  //             }
  //           ]
  //         },
  //         {
  //           "text": "old charts",
  //           "link": "smart-contracts-developers-v2/old-charts.md"
  //         }
  //       ]
  //     }
  //   ]
  // },
  {
    "text": "Smart Contracts Devs",
    "items": [
      {
        "text": "⛓️ Supported chains",
        "link": "smart-contracts/supported-chains.md"
      },
      // {
      //   "text": "🧩 Integration Models",
      //   "link": "smart-contracts/integration-models.md"
      // },
      {
        "text": "🔮 Wit/Oracle",
        "link": "smart-contracts/witnet-web-oracle/index.md",
        collapsed: true,
        "items": [
          {
            "text": "HTTP GET Requests in Solidity",
            "link": "smart-contracts/witnet-web-oracle/make-a-get-request.md"
          },
          {
            "text": "HTTP POST Requests in Solidity",
            "link": "smart-contracts/witnet-web-oracle/make-a-post-request.md"
          },
          {
            "text": "Query GraphQL APIs in Solidity",
            "link": "smart-contracts/witnet-web-oracle/query-graphql-apis-in-solidity.md"
          },
          {
            "text": "Dynamic Requests in Solidity",
            "link": "smart-contracts/witnet-web-oracle/dynamic-requests-in-solidity.md"
          },
          {
            "text": "UsingWitnet Inheritance",
            "link": "smart-contracts/witnet-web-oracle/usingwitnet-inheritance.md"
          },
          {
            "text": "API Reference",
            "link": "smart-contracts/witnet-web-oracle/api-reference/index.md",
            collapsed: true,
            "items": [
              {
                "text": "Solidity API",
                "link": "smart-contracts/witnet-web-oracle/api-reference/api-solidity.md",
                collapsed: true,
                "items": [
                  {
                    "text": "Solidity Contracts",
                    "link": "smart-contracts/witnet-web-oracle/api-reference/api-solidity/solidity-contracts/index.md",
                    collapsed: true,
                    "items": [
                      {
                        "text": "WitnetRequestBoard",
                        "link": "smart-contracts/witnet-web-oracle/witnet-request-board.md"
                      }
                    ]
                  }
                ]
              },
              {
                "text": "Javascript API",
                "link": "smart-contracts/witnet-web-oracle/api-reference/api-javascript.md"
              },
              {
                "text": "RADON API",
                "link": "smart-contracts/witnet-web-oracle/api-reference/radon-api/index.md",
                collapsed: true,
                "items": [
                  {
                    "text": "RADON Type System",
                    "link": "smart-contracts/witnet-web-oracle/api-reference/radon-api/radon-type-system.md"
                  },
                  {
                    "text": "RADON Errors",
                    "link": "smart-contracts/witnet-web-oracle/api-reference/radon-api/radon-errors.md"
                  }
                ]
              }
            ]
          },
          {
            "text": "Multi-chain Addresses",
            "link": "smart-contracts/witnet-web-oracle/contracts-addresses.md"
          }
        ]
      },
      {
        "text": "📈 Witnet Price Feeds",
        "link": "smart-contracts/witnet-data-feeds/index.md",
        collapsed: true,
        "items": [
          {
            "text": "How To Use Witnet Price Feeds",
            "link": "smart-contracts/witnet-data-feeds/price-feeds-registry.md"
          },
          {
            "text": "Update Conditions",
            "link": "smart-contracts/witnet-data-feeds/triggering-conditions.md"
          },
          {
            "text": "Code Examples",
            "link": "smart-contracts/witnet-data-feeds/using-witnet-data-feeds.md"
          },
          {
            "text": "API Reference",
            "link": "smart-contracts/witnet-data-feeds/api-reference.md"
          },
          {
            "text": "Multi-chain Addresses",
            "link": "smart-contracts/witnet-data-feeds/addresses/index.md",
            collapsed: true,
            "items": [
              {
                "text": "Arbitrum Price Feeds",
                "link": "smart-contracts/witnet-data-feeds/addresses/arbitrum-price-feeds.md"
              },
              {
                "text": "Avalanche Price Feeds",
                "link": "smart-contracts/witnet-data-feeds/addresses/avalanche-price-feeds.md"
              },
              {
                "text": "Base Price Feeds",
                "link": "smart-contracts/witnet-data-feeds/addresses/base-price-feeds.md"
              },
              {
                "text": "Boba Price Feeds",
                "link": "smart-contracts/witnet-data-feeds/addresses/boba-price-feeds.md"
              },
              {
                "text": "Celo Price Feeds",
                "link": "smart-contracts/witnet-data-feeds/addresses/celo-price-feeds.md"
              },
              {
                "text": "Conflux Price Feeds",
                "link": "smart-contracts/witnet-data-feeds/addresses/conflux-price-feeds.md"
              },
              {
                "text": "Cronos Price Feeds",
                "link": "smart-contracts/witnet-data-feeds/addresses/cronos-price-feeds.md"
              },
              {
                "text": "Dogechain Price Feeds",
                "link": "smart-contracts/witnet-data-feeds/addresses/dogechain-price-feeds.md"
              },
              {
                "text": "Elastos Price Feeds",
                "link": "smart-contracts/witnet-data-feeds/addresses/elastos-price-feeds.md"
              },
              {
                "text": "Ethereum Price Feeds",
                "link": "smart-contracts/witnet-data-feeds/addresses/ethereum-price-feeds.md"
              },
              {
                "text": "Gnosis Chain Price Feeds",
                "link": "smart-contracts/witnet-data-feeds/addresses/gnosis-chain-price-feeds.md"
              },
              {
                "text": "Kaia Price Feeds",
                "link": "smart-contracts/witnet-data-feeds/addresses/kaia-price-feeds.md"
              },
              {
                "text": "Kava Price Feeds",
                "link": "smart-contracts/witnet-data-feeds/addresses/kava-price-feeds.md"
              },
              {
                "text": "KCC Price Feeds",
                "link": "smart-contracts/witnet-data-feeds/addresses/kcc-price-feeds.md"
              },
              {
                "text": "Mantle Price Feeds",
                "link": "smart-contracts/witnet-data-feeds/addresses/mantle-price-feeds.md"
              },
              {
                "text": "Meter Price Feeds",
                "link": "smart-contracts/witnet-data-feeds/addresses/meter-price-feeds.md"
              },
              {
                "text": "Metis Price Feeds",
                "link": "smart-contracts/witnet-data-feeds/addresses/metis-price-feeds.md"
              },
              {
                "text": "Moonbeam Price Feeds",
                "link": "smart-contracts/witnet-data-feeds/addresses/moonbeam-price-feeds.md"
              },
              {
                "text": "OKX Price Feeds",
                "link": "smart-contracts/witnet-data-feeds/addresses/okxchain-price-feeds.md"
              },
              {
                "text": "Optimism Price Feeds",
                "link": "smart-contracts/witnet-data-feeds/addresses/optimism-price-feeds.md"
              },
              {
                "text": "Polygon Price Feeds",
                "link": "smart-contracts/witnet-data-feeds/addresses/polygon-price-feeds.md"
              },
              {
                "text": "Reef Price Feeds",
                "link": "smart-contracts/witnet-data-feeds/addresses/reef-price-feeds.md"
              },
              {
                "text": "Scroll Price Feeds",
                "link": "smart-contracts/witnet-data-feeds/addresses/scroll-price-feeds.md"
              },
              {
                "text": "Syscoin Price Feeds",
                "link": "smart-contracts/witnet-data-feeds/addresses/syscoin-price-feeds.md"
              },
              {
                "text": "Ultron Price Feeds",
                "link": "smart-contracts/witnet-data-feeds/addresses/ultron-price-feeds.md"
              },
              // {
              //   "text": "Request new price feed or chain support",
              //   "link": "https://tally.so/r/wMZDAn"
              // },
              {
                "text": "World Chain Feeds",
                "link": "smart-contracts/witnet-data-feeds/addresses/world-chain-feeds.md"
              }
            ]
          }
        ]
      },
      {
        "text": "🎲 Witnet Randomness",
        "link": "smart-contracts/witnet-randomness-oracle/index.md",
        collapsed: true,
        "items": [
          {
            "text": "Generating Randomness",
            "link": "smart-contracts/witnet-randomness-oracle/generating-randomness.md"
          },
          {
            "text": "WitnetRandomness Contract",
            "link": "smart-contracts/witnet-randomness-oracle/randomness-contract.md"
          },
          {
            "text": "Low-level Requests",
            "link": "smart-contracts/witnet-randomness-oracle/randomness-requests.md"
          },
          {
            "text": "Code Examples",
            "link": "smart-contracts/witnet-randomness-oracle/code-examples.md"
          },
          {
            "text": "API Reference",
            "link": "smart-contracts/witnet-randomness-oracle/api-reference.md"
          },
          {
            "text": "Multi-chain Addresses",
            "link": "smart-contracts/witnet-randomness-oracle/contract-addresses.md"
          }
        ]
      },
      {
        "text": "🌐 Witnet Custom Feeds",
        "link": "smart-contracts/witnet-custom-feeds.md"
      },
      {
        "text": "🏗️ Guides",
        "link": "smart-contracts/guides/index.md",
        collapsed: true,
        "items": [
          {
            "text": "📖 Solidity Contracts",
            "link": "smart-contracts/guides/solidity-contracts/index.md",
            collapsed: true,
            "items": [
              {
                "text": "Appliances",
                "link": "smart-contracts/guides/solidity-contracts/appliances/index.md",
                "items": [
                  {
                    "text": "📃 WitnetPriceFeeds",
                    "link": "smart-contracts/guides/solidity-contracts/appliances/witnetpricefeeds.md"
                  },
                  {
                    "text": "📃 WitnetRandomness",
                    "link": "smart-contracts/guides/solidity-contracts/appliances/witnetrandomness.md"
                  }
                ]
              },
              {
                "text": "Core",
                "link": "smart-contracts/guides/solidity-contracts/core/index.md",
                collapsed: true,
                "items": [
                  {
                    "text": "📃 WitnetOracle",
                    "link": "smart-contracts/guides/solidity-contracts/core/witnetoracle.md"
                  },
                  {
                    "text": "📃 WitnetRadonRegistry",
                    "link": "smart-contracts/guides/solidity-contracts/core/witnetradonregistry.md"
                  },
                  {
                    "text": "📃 WitnetRequest",
                    "link": "smart-contracts/guides/solidity-contracts/core/witnetrequest.md"
                  },
                  {
                    "text": "📃 WitnetRequestFactory",
                    "link": "smart-contracts/guides/solidity-contracts/core/witnetrequestfactory.md"
                  },
                  {
                    "text": "📃 WitnetRequestTemplate",
                    "link": "smart-contracts/guides/solidity-contracts/core/witnetrequesttemplate.md"
                  }
                ]
              },
              {
                "text": "Mockups",
                "link": "smart-contracts/guides/solidity-contracts/mockups/index.md",
                collapsed: true,
                "items": [
                  {
                    "text": "📃 UsingWitnet",
                    "link": "smart-contracts/guides/solidity-contracts/mockups/usingwitnet.md"
                  },
                  {
                    "text": "📃 UsingWitnetRandomness",
                    "link": "smart-contracts/guides/solidity-contracts/mockups/usingwitnetrandomness.md"
                  },
                  {
                    "text": "📃 UsingWitnetRequest",
                    "link": "smart-contracts/guides/solidity-contracts/mockups/usingwitnetrequest.md"
                  },
                  {
                    "text": "📃 UsingWitnetRequestTemplate",
                    "link": "smart-contracts/guides/solidity-contracts/mockups/usingwitnetrequesttemplate.md"
                  },
                  {
                    "text": "📃 WitnetRandomnessRequestConsumer",
                    "link": "smart-contracts/guides/solidity-contracts/mockups/witnetrandomnessrequestconsumer.md"
                  },
                  {
                    "text": "📃 WitnetRequestConsumer",
                    "link": "smart-contracts/guides/solidity-contracts/mockups/witnetrequestconsumer.md"
                  },
                  {
                    "text": "📃 WitnetRequestTemplateConsumer",
                    "link": "smart-contracts/guides/solidity-contracts/mockups/witnetrequesttemplateconsumer.md"
                  }
                ]
              }
            ]
          },
          {
            "text": "🧙 Solidity Wizard",
            "link": "smart-contracts/guides/solidity-wizard.md"
          },
          // {
          //   "text": "✒️ Radon Scripting",
          //   "link": "smart-contracts/guides/radon-scripting.md"
          // },
          // {
          //   "text": "🛠️ Witnet Toolkit",
          //   "link": "smart-contracts/guides/witnet-toolkit/index.md",
          //   collapsed: true,
          //   "items": [
          //     {
          //       "text": "Blockchain info",
          //       "link": "smart-contracts/guides/witnet-toolkit/blockchain-info.md"
          //     },
          //     {
          //       "text": "Tracking data requests",
          //       "link": "smart-contracts/guides/witnet-toolkit/tracking-data-requests.md"
          //     },
          //     {
          //       "text": "Sending transactions",
          //       "link": "smart-contracts/guides/witnet-toolkit/sending-transactions.md"
          //     }
          //   ]
          // }
        ]
      },
      {
        "text": "🎓 Tutorials",
        "link": "smart-contracts/tutorials/index.md",
        collapsed: true,
        "items": [
          {
            "text": "Building a Satoshi/Wei custom price feed",
            "link": "https://medium.com/witnet/solidity-and-the-wit-oracle-852bc4b338c1#1e95"
          }
        ]
      }
    ]
  },
  {
    "text": "Witnet Node Operators",
    "items": [
      {
        "text": "💻 Node Requirements",
        "link": "node-operators/requirements.md"
      },
      {
        "text": "🚀 Getting Started (Docker)",
        "link": "node-operators/docker-quick-start-guide.md"
      },
      {
        "text": "🏆 Keep Your Nodes Running",
        "link": "node-operators/next-steps.md"
      },
      {
        "text": "📚 Reference Material",
        "link": "node-operators/reference-material/index.md",
        collapsed: true,
        "items": [
          {
            "text": "🤓 Advanced Setups",
            "link": "node-operators/reference-material/advanced-setups/index.md",
            "items": [
              {
                "text": "💻 Run node as a systemd service",
                "link": "node-operators/reference-material/advanced-setups/systemd.md"
              },
              {
                "text": "🐋 Run node with docker compose",
                "link": "node-operators/reference-material/advanced-setups/docker-compose.md"
              },
              {
                "text": "🧄 Paranoid mode (Witnet over proxies and Tor)",
                "link": "node-operators/reference-material/advanced-setups/paranoid-mode-witnet-over-proxies-and-tor.md"
              },
              {
                "text": "⚙️ Configuration file",
                "link": "node-operators/reference-material/advanced-setups/configuration-file.md"
              }
            ]
          },
          {
            "text": "⚡ API References",
            "link": "node-operators/reference-material/api-references/index.md",
            collapsed: true,
            "items": [
              {
                "text": "Wit/Node JSON-RPC API",
                "link": "node-operators/reference-material/api-references/node-api.md"
              },
              {
                "text": "Wit/Wallet JSON-RPC API",
                "link": "node-operators/reference-material/api-references/wallet-api.md"
              }
            ]
          },
          {
            "text": "⌨️ CLI Reference",
            "link": "node-operators/reference-material/cli.md"
          },
          {
            "text": "🗜️ Compile from Source Code",
            "link": "node-operators/reference-material/compile-from-source-code.md"
          }
        ]
      }
    ]
  },
  {
    "text": "Witnet Ecosystem Buidlers",
    "items": [
      {
        "text": "👋 Introduction",
        "link": "witnet-ecosystem-buidlers/introduction.md"
      },
      {
        "text": "🚀 Getting Started",
        "link": "witnet-ecosystem-buidlers/getting-started.md"
      },
      {
        "text": "🏗️ How-to Guides",
        "link": "witnet-ecosystem-buidlers/how-to-guides/index.md",
        collapsed: true,
        "items": [
          {
            "text": "Connect to a Wit/RPC provider",
            "link": "witnet-ecosystem-buidlers/how-to-guides/connect-to-a-wit-rpc-provider.md"
          },
          {
            "text": "Query stake entries in Witnet",
            "link": "witnet-ecosystem-buidlers/how-to-guides/query-stake-entries-in-witnet.md"
          },
          {
            "text": "Manage Witnet wallets",
            "link": "witnet-ecosystem-buidlers/how-to-guides/manage-witnet-wallets.md"
          },
          {
            "text": "Manage Witnet UTXOs",
            "link": "witnet-ecosystem-buidlers/how-to-guides/manage-witnet-utxos.md"
          },
          {
            "text": "Manage Witnet transactions",
            "link": "witnet-ecosystem-buidlers/how-to-guides/manage-witnet-transactions.md"
          },
          // {
          //   "text": "Manage Radon assets",
          //   "link": "witnet-ecosystem-buidlers/how-to-guides/manage-radon-assets.md"
          // }
        ]
      },
      {
        "text": "📚 Reference Material",
        "link": "witnet-ecosystem-buidlers/reference-material/index.md",
        collapsed: true,
        "items": [
          {
            "text": "⚡ API References",
            "link": "witnet-ecosystem-buidlers/reference-material/api-references/index.md",
            "items": [
              {
                "text": "Wit/Explorer REST API",
                "link": "https://witnet.network/api/documentation"
              },
              // {
              //   "text": "Wit/Kermit REST API",
              //   "link": "witnet-ecosystem-buidlers/reference-material/api-references/wit-kermit-rest-api.md"
              // },
              {
                "text": "Wit/Node JSON-RPC",
                "link": "node-operators/reference-material/api-references/node-api.md"
              },
              {
                "text": "Wit/Wallet JSON-RPC",
                "link": "node-operators/reference-material/api-references/wallet-api.md"
              }
            ]
          },
          {
            "text": "⌨️ CLI References",
            "link": "witnet-ecosystem-buidlers/reference-material/cli-references/index.md",
            collapsed: true,
            "items": [
              {
                "text": "npx witsdk",
                "link": "https://github.com/witnet/witnet-sdk?tab=readme-ov-file#%EF%B8%8F-usage"
              },
              {
                "text": "npx ethrpc",
                "link": "https://github.com/witnet/ethrpc-gateway?tab=readme-ov-file#%EF%B8%8F-usage"
              }
            ]
          },
          {
            "text": "🕸️ Network Providers",
            "link": "witnet-ecosystem-buidlers/reference-material/network-providers.md"
          },
          {
            "text": "🏙️ Witnet Ecosystem Apps",
            "link": "witnet-ecosystem-buidlers/reference-material/witnet-ecosystem-apps/index.md",
            collapsed: true,
            "items": [
              {
                "text": "myWitWallet Flutter App",
                "link": "https://github.com/witnet/my-wit-wallet"
              },
              {
                "text": "Sheikah Electron App",
                "link": "https://github.com/witnet/sheikah"
              },
              {
                "text": "Wrapped/WIT Js CLI",
                "link": "https://github.com/witnet/witnet-wrapped-wit"
              },
              {
                "text": "Wrapped/WIT Vue3 App",
                "link": "https://github.com/witnet/wrapped-wit-ui"
              }
            ]
          }
        ]
      }
    ]
  }
]

const normalizeLink = (link: string) => {
  if (link.startsWith('http://') || link.startsWith('https://')) {
    return link
  }
  let normalized = link.replace(/index\.md$/, '').replace(/\.md$/, '')
  if (!normalized.startsWith('/')) {
    normalized = `/${normalized}`
  }
  if (normalized.endsWith('/index')) {
    normalized = normalized.replace(/\/index$/, '/')
  }
  return normalized
}

const normalizeItems = (items: SidebarItem[]): SidebarItem[] =>
  items.map((item) => ({
    ...item,
    link: item.link ? normalizeLink(item.link) : undefined,
    items: item.items ? normalizeItems(item.items) : undefined
  }))

const sidebar = normalizeItems(rawSidebar)

export default {
  title: 'Witnet Oracle Docs',
  description: 'Multi-chain, secure and reliable data retrievals right from the outside world.',
  base: '/',
  cleanUrls: true,
  vite: {
    server: {
      host: '127.0.0.1',
      port: 5173
    }
  },
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    config: (md) => {
      md.use(tabsMarkdownPlugin)
    }
  },
  themeConfig: {
    nav: [
      { text: 'Introduction', link: '/intro/about/' },
      { text: 'Smart Contracts', link: '/smart-contracts/supported-chains' },
      { text: 'Node Operators', link: '/node-operators/requirements' },
      { text: 'Ecosystem Builders', link: '/witnet-ecosystem-buidlers/introduction' },
      { text: 'Website', link: 'https://witnet.io/' },
      { text: 'Discord', link: 'https://discord.com/invite/witnet' },
      { text: 'Telegram', link: 'https://t.me/witnetio' },
      { text: 'X', link: 'https://t.me/witnetio' },

    ],
    sidebar: {
      '/': sidebar
    },
    search: {
      provider: 'local'
    }
  },
  srcExclude: [
    '**/witnet-the-oracle-making-physical-infrastructure-trustless-and-verifiable.md',
    '**/radon-scripting.md',
    '**/smart-contracts/guides/witnet-toolkit/**',
    '**/smart-contracts-developers-v2/**',
    '**/manage-radon-assets.md',
    '**/wit-kermit-rest-api.md'
  ]
}
