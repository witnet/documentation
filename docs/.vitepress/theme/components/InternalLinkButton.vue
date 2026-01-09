<script setup lang="ts">
const props = defineProps<{
  emoji?: string
  text: string
  to: string
}>()
</script>

<template>
  <a
    class="internal-link-button"
    :class="{ 'internal-link-button--no-emoji': !props.emoji }"
    :href="to"
  >
    <span v-if="props.emoji" class="internal-link-button__emoji" aria-hidden="true">
      {{ props.emoji }}
    </span>
    <span class="internal-link-button__text">{{ props.text }}</span>
    <span class="internal-link-button__arrow" aria-hidden="true">
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
