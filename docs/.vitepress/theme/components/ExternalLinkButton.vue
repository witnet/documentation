<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  image: string
  title: string
  emoji?: string
  website: string
}>()

const imageSrc = computed(() => {
  if (props.image.startsWith('/')) {
    return props.image
  }
  return `/assets/${props.image}`
})
</script>

<template>
  <a
    class="external-link-button"
    :href="website"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span class="external-link-button__icon">
      <span v-if="props.emoji" class="external-link-button__emoji" aria-hidden="true">
        {{ props.emoji }}
      </span>
      <img
        v-else
        :src="imageSrc"
        :alt="`${title} logo`"
        loading="lazy"
      />
    </span>
    <span class="external-link-button__text">
      <span class="external-link-button__title">{{ title }}</span>
      <span class="external-link-button__site">{{ website }}</span>
    </span>
    <span class="external-link-button__arrow" aria-hidden="true">
      <svg viewBox="0 0 24 24" role="presentation">
        <path
          d="M5 12h12m0 0l-4-4m4 4l-4 4"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.8"
        />
      </svg>
    </span>
  </a>
</template>
