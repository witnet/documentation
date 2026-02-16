<script setup lang="ts">
import {computed, defineProps} from 'vue'

const props = defineProps<{
  image: string
  title: string
  enableImage: boolean
}>()

const showImage = computed(() => {
 if(props.image.length > 0 ) {
   if (props.enableImage) {
     return true;
   }
 }
  return false;
})
</script>

<template>
  <div class="network-identity">
    <div class="logo-wrapper" v-if="showImage">
      <img
          :src="`/assets/network_logos/${props.image}`"
          :alt="props.title"
          class="network-logo"
      />
    </div>
    <span class="network-name"><strong>{{ props.title }}</strong></span>
  </div>
</template>

<style scoped>
.network-identity {
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: break-spaces;
}

.logo-wrapper {
  display: flex;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
}
</style>
