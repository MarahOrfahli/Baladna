import { useCallback, useState } from "react";
import { UserForm, useUserStore } from "../../../features/users";
import { DataTable } from "../../../features/datatable";
import { useModalStore } from "../../../store/modalStore";
import {
  AddEditModal,
  DeleteConfirmModal,
  Toast
} from "../../../components/ui";

export const Users = () => {
  // User store
  const {
    users,
    length,
    loading,
    fetchUsers,
    addUser,
    updateUser,
    deleteUser
  } = useUserStore();

  const searchKeys = ["name", "email", "role", "phone"];

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
      result = await updateUser(editingData.id, formData);
    } else {
      result = await addUser(formData);
    }
    if (result.success) {
      showToast(
        editingData
          ? "Employee updated successfully!"
          : "Employee added successfully!",
        "success"
      );
      closeAddEdit();
    } else {
      showToast(result.error || "Operation failed", "error");
    }
  };

  // Handle delete confirmation
  const handleConfirmDelete = async () => {
    const result = await deleteUser(deleteTargetIds);
    if (result.success) {
      showToast(
        deleteTargetIds.length > 1
          ? `${deleteTargetIds.length} records deleted`
          : "Employee deleted",
        "info"
      );
    } else {
      showToast(result.error || "Delete failed", "error");
    }
    closeDelete();
  };

  const setPaginationData = useCallback(
    (params) => {
      fetchUsers(params);
    },
    [fetchUsers]
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
    { key: "role", label: "Role", sortable: false },
    { key: "phone", label: "Phone", sortable: false },
    { key: "email", label: "Email", sortable: false },
    { key: "is_active", label: "Activity", sortable: false }
  ];

  const filters = [
    {
      key: "role",
      label: "All Roles",
      options: [
        { value: "admin", label: "Admin" },
        { value: "employee", label: "Employee" },
        { value: "citizen", label: "Citizen" }
      ]
    },
    // {
    //   key: "is_active",
    //   label: "All Status",
    //   options: [
    //     { value: "1", label: "Active" },
    //     { value: "0", label: "Unactive" },
    //   ]
    // }
  ];

  return (
    <div className="min-h-screen  py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <DataTable
          title="Users"
          description=""
          data={users}
          totalEntries={length}
          columns={columns}
          loading={loading}
          searchKeys={searchKeys}
          getSearchParams={getSearchParams}
          searchPlaceholder="Search by name, email, or role..."
          filters={filters}
          setPaginationData={setPaginationData}
          onAdd={() => openAddEdit(null)}
          addLabel={"Add Employee"}
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
        <UserForm
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
