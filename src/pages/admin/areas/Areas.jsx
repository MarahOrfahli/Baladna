import { useCallback, useState } from "react";
import { useModalStore } from "../../../store/modalStore";
import { AreaForm, useAreaStore } from "../../../features/areas";
import { DataTable } from "../../../features/datatable";
import {
  AddEditModal,
  Toast,
  DeleteConfirmModal
} from "../../../components/ui";

export const Areas = () => {
  // Area store
  const {
    areas,
    length,
    loading,
    fetchAreas,
    addArea,
    updateArea,
    deleteArea
  } = useAreaStore();

  // Modal store
  const {
    addEditOpen,
    editingData,
    deleteOpen,
    deleteTargetIds,
    openAddEdit,
    closeAddEdit,
    openDelete,
    closeDelete
  } = useModalStore();

  const searchKeys = ["name"];

  // Toast state
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "info"
  });

  const showToast = (message, type = "info") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3500);
  };

  const reloadData = ()=>{
    setTimeout(() => {
        fetchAreas({ page: 1, per_page: 5})
      }, 1500);
  }

  // Handle add/edit submission
  const handleSaveUser = async (formData) => {
    if (editingData) {
      const res = await updateArea(editingData.id, {
        name: formData.name,
        parent_id: formData.parent_id
      })
      if (res) showToast("Area updated successfully!", "success");
        else showToast("Error!", "error");
      reloadData()
    } else {
      const res = await addArea(formData);
      if (res) showToast("Area Added successfully!", "success");
      else showToast("Error!", "error");
      reloadData()
    }
    closeAddEdit();
  };

  // Handle delete confirmation
  const handleConfirmDelete = async () => {
    const res = await deleteArea(deleteTargetIds[0]);
    if (res == 204) showToast("Area deleted successfully!", "success");
    else showToast("Error!", "error");
    closeDelete();
  };

  const setPaginationData = useCallback(
    (params) => {
      fetchAreas(params);
    },
    [fetchAreas]
  );

  const getSearchParams = useCallback((query) => {
    const normalizedQuery = query.trim();
    return { search: normalizedQuery };
  }, []);

  // Define columns and filters (same as before)
  const columns = [
    { key: "name", label: "Name", sortable: false },
    { key: "parentName", label: "Related To", sortable: false }
  ];

  return (
    <div className="min-h-screen  py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <DataTable
          title="Areas"
          description=""
          data={areas}
          totalEntries={length}
          columns={columns}
          loading={loading}
          searchKeys={searchKeys}
          getSearchParams={getSearchParams}
          searchPlaceholder="Search by name.."
          setPaginationData={setPaginationData}
          onAdd={() => openAddEdit(null)}
          addLabel="Add New Area"
          onEdit={(row) => openAddEdit(row)}
          onDelete={(row) => openDelete([row.id], false)}
          // onBulkDelete={(ids) => openDelete(ids, true)}
        />
      </div>

      {/* Modals */}
      <AddEditModal
        isOpen={addEditOpen}
        onClose={closeAddEdit}
        initialData={editingData}
      >
        <AreaForm
          onSubmit={handleSaveUser}
          initialData={editingData}
          onClose={closeAddEdit}
        />
      </AddEditModal>

      <DeleteConfirmModal
        isOpen={deleteOpen}
        onClose={closeDelete}
        onConfirm={handleConfirmDelete}
        count={deleteTargetIds.length}
      />
      <Toast
        toast={toast}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />
    </div>
  );
};
