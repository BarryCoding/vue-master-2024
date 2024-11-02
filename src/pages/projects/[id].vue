<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute<'/projects/[id]'>()
</script>

<template>
  <div>
    <h1>Project {{ route.params.id }}</h1>
  </div>
</template>
