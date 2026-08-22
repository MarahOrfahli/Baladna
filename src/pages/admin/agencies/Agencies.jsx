import { useCallback, useState } from "react";
import { DataTable } from "../../../features/datatable";
import { useModalStore } from "../../../store/modalStore";
import { AgencyForm, useAgencyStore } from "../../../features/agencies";

import {
  AddEditModal,
  DeleteConfirmModal,
  Toast
} from "../../../components/ui";

export const Agencies = () => {
  // User store
  const {
    agencies,
    length,
    loading,
    fetchAgencies,
    addAgency,
    updateAgency,
    deleteAgency
  } = useAgencyStore();

  const searchKeys = ["name", "email", "description", "phone"];

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

  // Handle add/edit submission
  const handleSaveUser = async (formData) => {
    let result;
    if (editingData) {
      result = await updateAgency(editingData.id, formData);
    } else {
      result = await addAgency(formData);
    }
    if (result.success) {
      showToast(
        editingData
          ? "Agency updated successfully!"
          : "Agency added successfully!",
        "success"
      );
      closeAddEdit();
    } else {
      showToast(result.error || "Operation failed", "error");
    }
  };

  // Handle delete confirmation
  const handleConfirmDelete = async () => {
    const result = await deleteAgency(deleteTargetIds);
    if (result.success) {
      showToast(
        deleteTargetIds.length > 1
          ? `${deleteTargetIds.length} records deleted`
          : "Agency deleted",
        "info"
      );
    } else {
      showToast(result.error || "Delete failed", "error");
    }
    closeDelete();
  };

  const setPaginationData = useCallback(
    (params) => {
      fetchAgencies(params);
    },
    [fetchAgencies]
  );

  const getSearchParams = useCallback((query) => {
    const normalizedQuery = query.trim();
    const isPhoneQuery = /^[+\d\s()-]+$/.test(normalizedQuery);

    return {
      search: isPhoneQuery
        ? normalizedQuery.replace(/\D/g, "")
        : normalizedQuery
    };
  }, []);

  // Define columns and filters (same as before)
  const columns = [
    { key: "name", label: "Name", sortable: false },
    { key: "description", label: "Description", sortable: false },
    { key: "phone", label: "Phone", sortable: false },
    { key: "email", label: "Email", sortable: false },
    { key: "is_active", label: "Activity", sortable: false }
  ];

  const filters = [
    // {
    //   key: "is_active",
    //   label: "All Status",
    //   options: [
    //     { value: true, label: "Active" },
    //     { value: false, label: "Unactive" },
    //   ]
    // }
  ];

  return (
    <div className="min-h-screen  py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <DataTable
          title="Agencies"
          description=""
          data={agencies}
          totalEntries={length}
          columns={columns}
          loading={loading}
          searchKeys={searchKeys}
          getSearchParams={getSearchParams}
          searchPlaceholder="Search by name, email, or description..."
          filters={filters}
          setPaginationData={setPaginationData}
          onAdd={() => openAddEdit(null)}
          addLabel={"Add New Agency"}
          onEdit={(row) => openAddEdit(row)}
          onDelete={(row) => openDelete([row.id], false)}
        //   onBulkDelete={(ids) => openDelete(ids, true)}
        />
      </div>

      {/* Modals */}
      <AddEditModal
        isOpen={addEditOpen}
        onClose={closeAddEdit}
        initialData={editingData}
      >
        <AgencyForm
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
