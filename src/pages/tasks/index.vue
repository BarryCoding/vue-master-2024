<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'
import type { Tables } from '../../../database/types'

const tasks = ref<Tables<'vue_tasks'>[]>()

;(async () => {
  const { data, error } = await supabase.from('vue_tasks').select()
  if (error) return console.error('vue_tasks', error)
  tasks.value = data
})()
</script>

<template>
  <div>
    <h1>Tasks Page</h1>
    <RouterLink to="/">To home</RouterLink>
    <ul>
      <li :key="task.id" v-for="task in tasks">
        {{ task.name }} {{ task.status }} {{ task.description }}
      </li>
    </ul>
  </div>
</template>
