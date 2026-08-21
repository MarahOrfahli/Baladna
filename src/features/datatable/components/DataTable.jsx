/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'; // useMemo
import { useTableStore } from '../store/useTableStore';
import { TableToolbar } from './TableToolbar';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { TablePagination } from './TablePagination';
import { PageHeader } from '../../../components/header/wrapper/headers/PageHeader';

export const DataTable = ({
  title = '',
  description = '',
  data = [],
  columns = [],
  loading: externalLoading = false,
  totalEntries: externalTotalEntries,
  searchKeys = [],
  searchPlaceholder = 'Search...',
  filters = [],
  getSearchParams,
  // currentPage =1
  rowsPerPage = 5,
  setPaginationData,
  onAdd,
  addLabel = 'Add Record',
  onEdit,
  onDelete,
  onBulkDelete,
}) => {
  // Create store with initial state
  const store = useTableStore({
    // data,
    columns,
    searchKeys,
    filters,
    rowsPerPage,
  });



 

  // Derive state from store
  const {
    searchQuery,
    filterValues,
    sortColumn,
    sortDirection,
    currentPage,
    selectedRowIds,
    rowsPerPage: currentRowsPerPage,
    setSearchQuery,
    setFilterValue,
    resetFilters,
    setSort,
    setCurrentPage,
    setRowsPerPage,
    toggleSelectRow,
    selectAll,
    getFilteredData,
    getPaginatedData,
    getTotalEntries,
    getTotalPages,
  } = store;

    // Sync external data/loading into store
  useEffect(() => {
    store.setData(data);
  }, [data, store.setData]);

  useEffect(() => {
    store.setLoading(externalLoading);
  }, [externalLoading, store.setLoading]);

  useEffect(() => {
    const activeFilters = Object.fromEntries(
      Object.entries(filterValues).filter(([, value]) => value && value !== 'ALL')
    );

    const searchParams = searchQuery
      ? getSearchParams?.(searchQuery) ?? { search: searchQuery }
      : {};

    setPaginationData?.({
      page: currentPage,
      per_page: currentRowsPerPage,
      ...searchParams,
      ...activeFilters,
    });
  }, [setPaginationData, currentPage, currentRowsPerPage, searchQuery, filterValues, getSearchParams]);

  const isServerPaginated = !!setPaginationData;
  const paginatedData = isServerPaginated ? getFilteredData() : getPaginatedData();
  const totalEntries = externalTotalEntries ?? getTotalEntries();
  const totalPages = isServerPaginated
    ? Math.ceil(totalEntries / currentRowsPerPage) || 1
    : getTotalPages();
  const startIndex = (currentPage - 1) * currentRowsPerPage;
  const endIndex = Math.min(startIndex + currentRowsPerPage, totalEntries);

  // Selection helpers
  const pageIds = paginatedData.map((r) => r.id);
  const isAllSelected = pageIds.length > 0 && pageIds.every((id) => selectedRowIds.includes(id));

  const handleSelectAll = () => selectAll(pageIds);
  const handleBulkDelete = () => onBulkDelete && onBulkDelete(selectedRowIds);

  const hasActions = !!(onEdit || onDelete);
  const hasBulkSelect = !!onBulkDelete;

  return (
    <div className="w-full">
      {/* Title / Description */}
      <PageHeader title={title} />

      {/* Toolbar */}
      <TableToolbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterValues={filterValues}
        setFilterValue={setFilterValue}
        resetFilters={resetFilters}
        filters={filters}
        searchKeys={searchKeys}
        searchPlaceholder={searchPlaceholder}
        selectedCount={selectedRowIds.length}
        onBulkDelete={handleBulkDelete}
        onAdd={onAdd}
        addLabel={addLabel}
      />

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700/60 overflow-hidden transition-all">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-200">
            <TableHeader
              columns={columns}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              onSort={setSort}
              hasBulkSelect={hasBulkSelect}
              isAllSelected={isAllSelected}
              onSelectAll={handleSelectAll}
              hasActions={hasActions}
            />
            <TableBody
              rows={paginatedData}
              columns={columns}
              selectedRowIds={selectedRowIds}
              toggleSelectRow={toggleSelectRow}
              hasBulkSelect={hasBulkSelect}
              hasActions={hasActions}
              onEdit={onEdit}
              onDelete={onDelete}
              loading={externalLoading}
              rowsPerPage={currentRowsPerPage}
            />
          </table>
        </div>

        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          rowsPerPage={currentRowsPerPage}
          setRowsPerPage={setRowsPerPage}
          setCurrentPage={setCurrentPage}
          totalEntries={totalEntries}
          startIndex={startIndex}
          endIndex={endIndex}
        />
      </div>
    </div>
  );
};