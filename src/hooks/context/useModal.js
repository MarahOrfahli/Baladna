import { useState } from 'react';

export const useModal = () => {
  const [modal, setModal] = useState({ isOpen: false, mode: 'create', data: null });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, data: null });

  const openModal = (data = null, mode = data ? 'edit' : 'create') => {
    setModal({ isOpen: true, mode, data });
  };

  const openAddModal = (data = null) => openModal(data, 'create');
  const openEditModal = (data) => openModal(data, 'edit');

  const closeModal = () => {
    setModal({ isOpen: false, mode: 'create', data: null });
  };

  const openDeleteModal = (data) => setDeleteModal({ isOpen: true, data });
  const promptDeleteUser = (data) => openDeleteModal(data);

  const promptBulkDelete = (data) => openDeleteModal(data);

  const resetDeleteModal = () => {
    setDeleteModal({ isOpen: false, data: null });
  };

  const handleConfirmDelete = async (onConfirm) => {
    await onConfirm?.(deleteModal.data);
    resetDeleteModal();
  };

  const handleSave = async (onSave, formData) => {
    await onSave?.(formData, modal.data, modal.mode);
    closeModal();
  };

  return {
    modal,
    isModalOpen: modal.isOpen,
    editingUser: modal.data,
    openModal,
    openAddModal,
    openEditModal,
    closeModal,
    deleteModal,
    openDeleteModal,
    promptDeleteUser,
    promptBulkDelete,
    handleConfirmDelete,
    resetDeleteModal,
    handleSave,
  };
};