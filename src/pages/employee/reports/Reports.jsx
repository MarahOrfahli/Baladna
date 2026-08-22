import { useCallback, useState } from "react";
import { DataTable } from "../../../features/datatable";
import {
  Toast,
} from "../../../components/ui";
import { UseReportStore } from "../../../features/reports";

export const AdminReports = () => {
  const {
    reports,
    length,
    loading,
    fetchReports,
  } = UseReportStore();


  const searchKeys = ["name"];

  // Toast state
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "info"
  });




  const setPaginationData = useCallback(
    (params) => {
      fetchReports(params);
    },
    [fetchReports]
  );

  const getSearchParams = useCallback((query) => {
    const normalizedQuery = query.trim();
    return { search: normalizedQuery };
  }, []);

  // Define columns and filters (same as before)
  const columns = [
    { key: "reference_number", label: "REF", sortable: false },
    { key: "title", label: "Title", sortable: false },
    { key: "category", label: "Category", sortable: false },
    { key: "created_at", label: "Date", sortable: false },
    { key: "is_assigned", label: "Status", sortable: false }
  ];

  return (
    <div className="min-h-screen  py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <DataTable
          title="Reports"
          description=""
          data={reports}
          totalEntries={length}
          columns={columns}
          loading={loading}
          searchKeys={searchKeys}
          getSearchParams={getSearchParams}
          searchPlaceholder="Search by name.."
          setPaginationData={setPaginationData}
          onView = {()=>{ }}
          // onBulkDelete={(ids) => openDelete(ids, true)}
        />
      </div>
      <Toast
        toast={toast}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />
    </div>
  );
};
