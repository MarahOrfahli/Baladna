import { createStore } from "zustand/vanilla";

const normalizePhone = (value) => String(value ?? "").replace(/\D/g, "");

export const createTableStore = (initialState) => {
  const {
    columns = [],
    searchKeys = [],
    filters = [],
    rowsPerPage = 5
  } = initialState;

  return createStore((set, get) => ({
    // ----- state -----
    data:[],
    loading: false,
    searchQuery: "",
    searchKeys,
    columns,
    filters,
    filterValues: {},
    sortColumn: columns.find((c) => c.sortable)?.key || null,
    sortDirection: "asc",
    currentPage: 1,
    rowsPerPage,
    selectedRowIds: [],

    // ----- actions -----
    setData: (newData) => set({ data: newData }),
    setLoading: (loading) => set({ loading }),
    setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
    setFilterValue: (key, value) =>
      set((state) => ({
        filterValues: { ...state.filterValues, [key]: value },
        currentPage: 1
      })),
    resetFilters: () =>
      set({ searchQuery: "", filterValues: {}, currentPage: 1 }),
    setSort: (columnKey) =>
      set((state) => {
        const isSame = state.sortColumn === columnKey;
        return {
          sortColumn: columnKey,
          sortDirection: isSame
            ? state.sortDirection === "asc"
              ? "desc"
              : "asc"
            : "asc"
        };
      }),
    setCurrentPage: (page) => set({ currentPage: page }),
    setRowsPerPage: (size) => set({ rowsPerPage: size, currentPage: 1 }),
    toggleSelectRow: (id) =>
      set((state) => ({
        selectedRowIds: state.selectedRowIds.includes(id)
          ? state.selectedRowIds.filter((i) => i !== id)
          : [...state.selectedRowIds, id]
      })),
    selectAll: (ids) =>
      set((state) => {
        const allSelected = ids.every((id) =>
          state.selectedRowIds.includes(id)
        );
        return {
          selectedRowIds: allSelected
            ? state.selectedRowIds.filter((id) => !ids.includes(id))
            : Array.from(new Set([...state.selectedRowIds, ...ids]))
        };
      }),
    clearSelection: () => set({ selectedRowIds: [] }),

    // ----- computed (selectors) -----
    getFilteredData: () => {
      const { data, searchQuery, searchKeys, filterValues } = get();
      return data.filter((row) => {
        let matchesSearch = true;
        if (searchQuery && searchKeys.length > 0) {
          const normalizedQuery = searchQuery.toLowerCase();
          const normalizedPhoneQuery = normalizePhone(searchQuery);

          matchesSearch = searchKeys.some((key) => {
            if (key === "phone") {
              return normalizedPhoneQuery.length > 0 &&
                normalizePhone(row[key]).includes(normalizedPhoneQuery);
            }

            return String(row[key] ?? "")
              .toLowerCase()
              .includes(normalizedQuery);
          });
        }
        let matchesFilters = true;
        Object.entries(filterValues).forEach(([key, val]) => {
          if (val && val !== "ALL" && row[key] !== val) matchesFilters = false;
        });
        return matchesSearch && matchesFilters;
      });
    },

    getSortedData: () => {
      const filtered = get().getFilteredData();
      const { sortColumn, sortDirection, columns } = get();
      if (!sortColumn) return filtered;
      const colDef = columns.find((c) => c.key === sortColumn);
      return [...filtered].sort((a, b) => {
        let aVal = colDef?.sortValue ? colDef.sortValue(a) : a[sortColumn];
        let bVal = colDef?.sortValue ? colDef.sortValue(b) : b[sortColumn];
        if (typeof aVal === "string") {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
        }
        if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    },

    getPaginatedData: () => {
      const sorted = get().getSortedData();
      const { currentPage, rowsPerPage } = get();
      const start = (currentPage - 1) * rowsPerPage;
      return sorted.slice(start, start + rowsPerPage);
    },

    getTotalEntries: () => get().getSortedData().length,
    getTotalPages: () =>
      Math.ceil(get().getTotalEntries() / get().rowsPerPage) || 1
  }));
};
