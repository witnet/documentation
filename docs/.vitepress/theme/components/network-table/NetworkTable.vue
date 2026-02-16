<script setup lang="ts">
import { ref, computed, defineProps } from 'vue'
import { Network } from "../../../../data/network.ts"
import { testnets } from "../../../../data/testnets.ts"
import { mainnets } from "../../../../data/mainnets.ts"
import NetworkLabel from "./NetworkLabel.vue"

const search = ref('')

const filteredNetworks: computed<Network[]> = computed(() => {
  if (props.type === "testnet") {
    return testnets.filter(n =>
        n.name.toLowerCase().includes(search.value.toLowerCase()) ||
        n.token.toLowerCase().includes(search.value.toLowerCase())
    )
  } else if (props.type === "mainnet") {
    return mainnets.filter(n =>
        n.name.toLowerCase().includes(search.value.toLowerCase()) ||
        n.token.toLowerCase().includes(search.value.toLowerCase())
    )
  }
})

const props = defineProps<{
  type: string
  title: string
  placeholder?: string
  enableImage?: boolean
  searchable: boolean
}>()

</script>

<template>
  <div class="network-container">
  <h3>{{props.title}}</h3>
    <div class="table-wrapper">
      <table class="network-table">
        <div class="controls" v-if="searchable">
          <input
              v-model="search"
              type="text"
              :placeholder="placeholder"
              class="search-input"
          />
        </div>
        <thead>
        <tr>
          <th>Network</th>
          <th>Resources</th>
          <th>Fee</th>
          <th>Contracts</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="net in filteredNetworks" :key="net.name">
          <td class="network-name">
            <NetworkLabel :image="net.logo" :title="net.name" :enableImage="props.enableImage"/>
          </td>
          <td>
            <div class="links-cell">
              <a v-if="net.docs" :href="net.docs" target="_blank">docs</a>
              <a v-if="net.bridge" :href="net.bridge" target="_blank">bridge</a>
              <a v-if="net.ecosystem" :href="net.ecosystem" target="_blank">ecosystem</a>
            </div>
          </td>
          <td>
            <a :href="net.faucet || net.bridge " target="_blank">{{ net.token }}</a>
          </td>
          <td class="artifacts-cell">
            <div class="artifact-group">
              <a v-if="net.oracle" :href="net.oracle" title="Oracle" target="_blank">Wit/Oracle</a>
              <a v-if="net.price" :href="net.price" title="Price Feeds" target="_blank">Wit/Price Feeds</a>
              <a v-if="net.vrf" :href="net.vrf" title="Randomness" target="_blank">Wit/Randomness</a>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <p v-if="filteredNetworks.length === 0" class="no-results">No networks found matching "{{ search }}"</p>
    </div>
  </div>
</template>

<style scoped>
  .network-table td {
    vertical-align: middle;
    padding: 12px 8px;
  }
  .network-table th { text-align: left; background: var(--vp-c-bg-soft); }
  .links-cell { display: flex; gap: 8px; flex-wrap: wrap; }
  .artifact-group { display: flex; gap: 12px; flex-wrap: wrap}
  .artifact-group a { white-space: nowrap; font-size: 0.85rem; }
  .faucet-link code { color: var(--vp-c-brand);}
  .text-primary { color: var(--vp-c-brand-1); font-weight: 600; }

  @media (max-width: 768px) {
    .artifact-group { flex-direction: column; gap: 4px; }
  }
</style>