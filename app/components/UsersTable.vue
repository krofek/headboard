<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import { upperFirst } from 'scule'
import type { TableColumn } from '@nuxt/ui'
import { useClipboard } from '@vueuse/core'
import type { Payment } from '~/types'

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const toast = useToast()
const { copy } = useClipboard()

const openDrawer = ref(false)

const userRepository = getUserRepository()

const data = ref<Payment[]>(userRepository.getPayments())

const columns: TableColumn<Payment>[] = [
  {
    id: 'expand',
    cell: ({ row }) =>
      h(UButton, {
        'color': 'neutral',
        'variant': 'ghost',
        'icon': 'i-lucide-chevron-down',
        'square': true,
        'aria-label': 'Expand',
        'ui': {
          leadingIcon: [
            'transition-transform',
            row.getIsExpanded() ? 'duration-200 rotate-180' : ''
          ]
        },
        'onClick': () => row.toggleExpanded()
      })
  },
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => `#${row.getValue('id')}`
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      return new Date(row.getValue('date')).toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const color = {
        paid: 'success' as const,
        failed: 'error' as const,
        refunded: 'neutral' as const
      }[row.getValue('status') as string]

      return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () =>
        row.getValue('status')
      )
    }
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: 'Email',
        icon: isSorted
          ? isSorted === 'asc'
            ? 'i-lucide-arrow-up-narrow-wide'
            : 'i-lucide-arrow-down-wide-narrow'
          : 'i-lucide-arrow-up-down',
        class: '-mx-2.5',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
      })
    },
    cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('email'))
  },
  {
    accessorKey: 'amount',
    header: () => h('div', { class: 'text-right' }, 'Amount'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))

      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR'
      }).format(amount)

      return h('div', { class: 'text-right font-medium' }, formatted)
    }
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const items = [
        {
          type: 'label',
          label: 'Actions'
        },
        {
          label: 'Copy payment ID',
          onSelect() {
            copy(row.original.id)

            toast.add({
              title: 'Payment ID copied to clipboard!',
              color: 'success',
              icon: 'i-lucide-circle-check'
            })
          }
        },
        {
          label: row.getIsExpanded() ? 'Collapse' : 'Expand',
          onSelect() {
            row.toggleExpanded()
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'View customer'
        },
        {
          label: 'View payment details'
        }
      ]

      return h(
        'div',
        { class: 'text-right' },
        h(
          UDropdownMenu,
          {
            'content': {
              align: 'end'
            },
            items,
            'aria-label': 'Actions dropdown'
          },
          () =>
            h(UButton, {
              'icon': 'i-lucide-ellipsis-vertical',
              'color': 'neutral',
              'variant': 'ghost',
              'class': 'ml-auto',
              'aria-label': 'Actions dropdown'
            })
        )
      )
    }
  }
]

const table = useTemplateRef('table')

function randomize() {
  data.value = [...data.value].sort(() => Math.random() - 0.5)
}

const expanded = ref({ 1: true })
</script>

<template>
  <div class="flex-1 divide-y divide-accented w-full">
    <div class="flex items-center gap-2 px-4 py-3.5 overflow-x-auto">
      <UInput
        :model-value="table?.tableApi?.getColumn('email')?.getFilterValue() as string
        "
        class="max-w-sm min-w-[12ch]"
        placeholder="Filter emails..."
        @update:model-value="
          table?.tableApi?.getColumn('email')?.setFilterValue($event)
        "
      />

      <UButton
        color="neutral"
        label="Randomize"
        @click="randomize"
      />

      <UDropdownMenu
        :items="table?.tableApi
          ?.getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => ({
            label: upperFirst(column.id),
            type: 'checkbox' as const,
            checked: column.getIsVisible(),
            onUpdateChecked(checked: boolean) {
              table?.tableApi
                ?.getColumn(column.id)
                ?.toggleVisibility(!!checked);
            },
            onSelect(e: Event) {
              e.preventDefault();
            }
          }))
        "
        :content="{ align: 'end' }"
      >
        <UButton
          label="Columns"
          color="neutral"
          variant="outline"
          trailing-icon="i-lucide-chevron-down"
          class="ml-auto"
          aria-label="Columns select dropdown"
        />
      </UDropdownMenu>
    </div>

    <UTable
      ref="table"
      v-model:expanded="expanded"
      :data="data"
      :columns="columns"
      ticky
      class="h-150"
      :ui="{ tr: 'data-[expanded=true]:bg-elevated/50' }"
    >
      <template #expanded="{ row }">
        <pre>{{ row.original }}</pre>
      </template>
    </UTable>

    <UDrawer v-model:open="openDrawer">
      <template #content>
        <div class="p-4">
          <h2 class="text-lg font-semibold mb-4">
            Drawer Title
          </h2>
          <p>This is the content of the drawer.</p>
          <UButton
            label="Close Drawer"
            class="mt-4"
            @click="openDrawer = false"
          />
        </div>
      </template>
    </UDrawer>
  </div>
</template>
