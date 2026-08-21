/* eslint-disable react-hooks/exhaustive-deps */
// src/components/AreaForm.jsx
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { areaSchema } from "../schema/areaSchema";
import { useAreaFormStore } from "../store/areaFormStore";
import { useAreaStore } from "../store/useAreaStore";

export const AreaForm = ({
  submitLabel,
  cancelLabel = "Cancel",
  onSubmit,
  initialData,
  onClose
}) => {
  const {
    defaultValues,
    setDefaultValues,
    isSubmitting,
    setSubmitting,
    resetStore,
    submitError,
    setSubmitError
  } = useAreaFormStore();

  const {allAreas, fetchAllAreas} = useAreaStore()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(areaSchema),
    defaultValues: initialData || defaultValues
  });

  useEffect(()=>{
    fetchAllAreas()
  },[])

  useEffect(() => {
    if (initialData) {
      setDefaultValues(initialData);
      reset(initialData);
    } else {
      reset(defaultValues);
      resetStore()
    }
    setSubmitError(null);
  }, [initialData, reset, setDefaultValues, setSubmitError, defaultValues]);

  const onFormSubmit = async (data) => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      await onSubmit(data);
    } catch (error) {
      setSubmitError(error.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
          Area Name
        </label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="e.g. Adhamiya"
              className={`w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border 
              ${
                errors.name
                  ? "border-rose-500"
                  : "border-slate-200 dark:border-slate-700"
              }
              rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30`}
            />
          )}
        />
        {errors.name && (
          <p className="text-xs text-rose-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
          Related To (optional)
        </label>
        <Controller
          name="parent_id"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              value={field.value ?? ""} // التعامل مع null
              onChange={(e) =>
                field.onChange(e.target.value.length > 0 ? Number(e.target.value) : null)
              }
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            >
              <option value={''}>None</option>
              {allAreas.map(
                (area) =>
                  defaultValues.id !== area.id && (
                    <option key={area.id} value={area.id}>
                      {area.name}
                    </option>
                  )
              )}
            </select>
          )}
        />
      </div>

      {submitError && (
        <p className="text-sm text-rose-500 bg-rose-50 dark:bg-rose-900/20 p-2 rounded-xl">
          {submitError}
        </p>
      )}

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium transition-all"
        >
          {cancelLabel}
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl text-sm font-medium shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2"
        >
          <i className="fa-solid fa-check"></i>
          <span>
            {isSubmitting
              ? "Saving..."
              : submitLabel || (initialData ? "Update Area" : "Save Area")}
          </span>
        </button>
      </div>
    </form>
  );
};
