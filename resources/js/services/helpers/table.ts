import { computed, ref, type Ref } from 'vue';

export type SortOrder = 'asc' | 'desc';

export const sortTable = <T>(
    items: Ref<T[]>,
    initialSortKey: keyof T,
    initialSortOrder: SortOrder = 'asc'
) => {
    const sortKey = ref(initialSortKey);
    const sortOrder = ref<SortOrder>(initialSortOrder);

    const sortedItems = computed(() => {
        return [...items.value].sort((a, b) => {
            const key = sortKey.value as keyof T;
            const aVal = a[key];
            const bVal = b[key];

            if (aVal === null || aVal === undefined) return sortOrder.value === 'asc' ? -1 : 1;
            if (bVal === null || bVal === undefined) return sortOrder.value === 'asc' ? -1 : 1;
            if (aVal < bVal) return sortOrder.value === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortOrder.value === 'asc' ? 1 : -1;

            return 0;
        });
    });

    const sortBy = (key: keyof T) => {
        if (sortKey.value === key) {
            sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
        } else {
            sortKey.value = key;
            sortOrder.value = 'asc';
        }
    };

    const getSortIcon = (key: keyof T) => {
        if (sortKey.value !== key) return '';
        return sortOrder.value === 'asc' ? '↑' : '↓';
    };

    return { sortedItems, sortBy, getSortIcon };
};