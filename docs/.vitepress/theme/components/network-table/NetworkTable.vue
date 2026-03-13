<script setup lang="ts">
    import { ref, computed, onMounted, defineProps } from 'vue'
    import NetworkLabel from "./NetworkLabel.vue"
    import { data as allWitnetNetworks } from '../../../network.data.ts'
    
    const props = defineProps<{
        type: 'mainnet' | 'testnet'
        title: string
        placeholder?: string
        enableImage?: boolean
        searchable: boolean
    }>()

    const search = ref('')
    const loading = ref(true)
    const activeTab = ref<'mainnet' | 'testnet'>('mainnet')

    const filteredNetworks = computed(() => {
        if (!allWitnetNetworks) return []

        return allWitnetNetworks
            .filter(n => activeTab.value === 'mainnet' ? n.isMainnet : !n.isMainnet)
            .filter(n =>
                n.name.toLowerCase().includes(search.value.toLowerCase()) ||
                n.tag.toLowerCase().includes(search.value.toLowerCase())
            )
    })
</script>


<template>
    <div class="network-container">
        <div class="header-row">
            <div class="tabs-container">
                <button :class="['tab-button', { active: activeTab === 'mainnet' }]" @click="activeTab = 'mainnet'">Mainnets</button>
                <button :class="['tab-button', { active: activeTab === 'testnet' }]" @click="activeTab = 'testnet'">Testnets</button>
            </div>

            <div class="controls" v-if="searchable">
                <input v-model="search"
                       type="text"
                       placeholder="Search Networks..."
                       class="search-input" />
            </div>
        </div>

        <div class="table-wrapper">
            <table class="network-table">
                <thead>
                    <tr>
                        <th>Network</th>
                        <th>PUSH DataFeeds</th>
                        <th>PULL DataFeeds</th>
                        <th>Backed PriceFeeds</th>
                        <th>Verifiable Randomness</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="net in filteredNetworks" :key="net.tag">
                        <td class="network-name">
                            <NetworkLabel :image="net.logo" :title="net.name" :enableImage="props.enableImage" />
                        </td>
                        <td class="status-col"><span title="PUSH Data Feeds">{{net.pushDFS ? '✔️' : '❌'}}</span></td>
                        <td class="status-col"><span title="PULL Data Feeds">{{net.pullDFS ? '✔️' : '❌'}}</span></td>
                        <td class="status-col"><span title="Backed Price Feeds">{{net.subsPFS ? '✔️' : '❌'}}</span></td>
                        <td class="status-col"><span title="Verifiable Randomness">{{net.pullRNG ? '✔️' : '❌'}}</span></td>
                    </tr>
                </tbody>
            </table>

            <p v-if="filteredNetworks.length === 0" class="no-results">
                No {{ activeTab }}s found matching "{{ search }}"
            </p>
        </div>
    </div>
</template>

<style scoped>
    .network-container {
        margin-top: 2rem;
    }

    .header-row {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 1rem;
        gap: 1rem;
    }

    .tabs-container {
        display: flex;
        background: var(--vp-c-bg-soft);
        border: 1px solid var(--vp-c-divider);
        border-radius: 4px;
        padding: 2px;
    }

    .tab-button {
        padding: 6px 20px;
        font-size: 0.9rem;
        font-weight: 600;
        transition: all 0.2s;
        color: var(--vp-c-text-2);
        border: none;
        background: none;
        cursor: pointer;
        border-radius: 2px;
    }

        .tab-button.active {
            background: var(--vp-c-bg);
            color: var(--vp-c-brand-1);
            box-shadow: var(--vp-shadow-1);
        }

    .search-input {
        background: transparent;
        border: none;
        border-bottom: 1px solid var(--vp-c-divider);
        padding: 8px 4px;
        color: var(--vp-c-text-1);
        font-size: 0.9rem;
        outline: none;
        width: 200px;
        transition: border-color 0.2s;
    }

        .search-input:focus {
            border-color: var(--vp-c-brand-1);
        }

    .table-wrapper {
        overflow-x: auto;
    }

    .network-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.95rem;
    }

        .network-table th {
            text-align: left;
            padding: 12px 16px;
            background: var(--vp-c-bg-soft);
            color: var(--vp-c-text-2);
            font-weight: 600;
            border-bottom: 2px solid var(--vp-c-divider);
        }
        .network-table tr,
        .network-table tr:nth-child(2n) {
            background-color: transparent !important;
            transition: background-color 0.2s ease;
        }


            .network-table tr:hover,
            .network-table tr:nth-child(2n):hover {
                background-color: var(--vp-c-bg-soft) !important;
                cursor: default;
            }

                .network-table tr:hover .network-name {
                    color: var(--vp-c-brand-1);
                }

            .network-table tr:nth-child(even) {
                background-color: transparent;
            }
        .network-table td {
            padding: 12px 16px;
            border-bottom: 1px solid var(--vp-c-divider);
            vertical-align: middle;
        }

            .network-table td:not(.network-name) {
                text-align: center;
            }


    .no-results {
        text-align: center;
        padding: 2rem;
        color: var(--vp-c-text-2);
    }

    @media (max-width: 640px) {
        .header-row {
            flex-direction: column;
            align-items: flex-start;
        }

        .search-input {
            width: 100%;
        }
    }
</style>