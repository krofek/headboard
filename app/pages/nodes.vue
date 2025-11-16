<script lang="ts" setup>
const { data: users } = await useAPI().userRepository.getAll()
</script>

<template>
  <UDashboardPanel id="nodes">
    <template #header>
      <UDashboardNavbar
        title="Nodes"
        :ui="{ right: 'gap-3' }"
      >
        <template #leading>
          <!-- <UDashboardSidebarCollapse /> -->
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <pre>{{ users }}</pre>
    </template>
  </UDashboardPanel>
</template>
