import { utils, Rulebook } from "@witnet/price-feeds"

export default {
    async load() {
        try {

            const rulebook = await Rulebook.default();
            const rawNetworks = utils.getEvmNetworks();

            if (!rawNetworks) return [];

            const results =  Object.entries(rawNetworks).map(([tag, network]: [string, any]) => {
                return {
                    tag,
                    name: network.name || tag,
                    logo: `${network.ecosystem || 'default'}.svg`,
                    isMainnet: !!network.mainnet,
                    chainId: network.chainId,
                    symbol: network.symbol,
                    pushDFS: true,
                    pullDFS: !network.pushOnly,
                    pullRNG: !network.pushOnly
                        && utils.isValidEvmAddress(network.addresses.WitRandomness),
                    subsPFS: !network.pushOnly
                        && utils.isValidEvmAddress(network.addresses.WitPriceFeeds)
                        && Object.keys(rulebook.getNetworkPriceFeeds(tag)?.oracles).length > 0,
                    explorerUrl: network.explorerUrl || '#',
                    oracle: network.addresses?.WitOracle && network.explorerUrl
                        ? `${network.explorerUrl}/address/${network.addresses.WitOracle}` : null,
                    price: network.addresses?.WitPriceFeeds && network.explorerUrl
                        ? `${network.explorerUrl}/address/${network.addresses.WitPriceFeeds}` : null,
                    vrf: network.addresses?.WitRandomness && network.explorerUrl
                        ? `${network.explorerUrl}/address/${network.addresses.WitRandomness}` : null,
                    hasPriceFeeds: rulebook ? Object.keys(rulebook.getNetworkPriceFeeds(tag)?.oracles).length > 0 : false
                };
            });
            console.log(results.length);
            return results;
        } catch (e) {
            console.error("DATA LOADER CRASHED:", e);
            return [];
        }
    }
}