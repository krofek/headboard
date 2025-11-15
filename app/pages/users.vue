<script lang="ts" setup>
import UsersTable from '~/components/UsersTable.vue'
</script>

<template>
  <UDashboardPanel id="users">
    <template #header>
      <UDashboardNavbar
        title="Users"
        :ui="{ right: 'gap-3' }"
      >
        <template #leading>
          <!-- <UDashboardSidebarCollapse /> -->
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <UsersTable />
    </template>
  </UDashboardPanel>
</template>
