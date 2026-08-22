import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { agencySchema } from "../schemas/agencySchema";
import { useAgencyFormStore } from "../store/agencyFormStore";

export const AgencyForm = ({
  submitLabel,
  cancelLabel = "Cancel",
  onSubmit,
  initialData,
  onClose,
}) => {
    
  const {
    defaultValues,
    setDefaultValues,
    isSubmitting,
    setSubmitting,
    submitError,
    setSubmitError,
  } = useAgencyFormStore();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(agencySchema),
    defaultValues: initialData || defaultValues,
  });

  useEffect(() => {
    if (initialData) {
      setDefaultValues(initialData);
      reset(initialData);
    } else {
      reset(defaultValues);
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
      {/* حقل الاسم */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
          Agency Name <span className="text-rose-500">*</span>
        </label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="e.g. Electricity Department"
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

      {/* حقل الوصف */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
          Description
        </label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              rows={3}
              placeholder="Describe the agency responsibilities..."
              className={`w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border 
              ${
                errors.description
                  ? "border-rose-500"
                  : "border-slate-200 dark:border-slate-700"
              }
              rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30`}
            />
          )}
        />
        {errors.description && (
          <p className="text-xs text-rose-500 mt-1">{errors.description.message}</p>
        )}
      </div>

      {/* حقل البريد الإلكتروني */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
          Email Address
        </label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="email"
              placeholder="e.g. info@agency.gov"
              className={`w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border 
              ${
                errors.email
                  ? "border-rose-500"
                  : "border-slate-200 dark:border-slate-700"
              }
              rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30`}
            />
          )}
        />
        {errors.email && (
          <p className="text-xs text-rose-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* حقل رقم الهاتف */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
          Phone Number
        </label>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="tel"
              placeholder="e.g. +964 123 456 789"
              className={`w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border 
              ${
                errors.phone
                  ? "border-rose-500"
                  : "border-slate-200 dark:border-slate-700"
              }
              rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30`}
            />
          )}
        />
        {errors.phone && (
          <p className="text-xs text-rose-500 mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* حقل الحالة (نشط) */}
      <div className="flex items-center gap-3">
        <Controller
          name="is_active"
          control={control}
          render={({ field }) => (
            <input
              type="checkbox"
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
            />
          )}
        />
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Active
        </label>
      </div>

      {/* عرض الخطأ العام */}
      {submitError && (
        <p className="text-sm text-rose-500 bg-rose-50 dark:bg-rose-900/20 p-2 rounded-xl">
          {submitError}
        </p>
      )}

      {/* أزرار الإجراءات */}
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
              : submitLabel || (initialData ? "Update Agency" : "Save Agency")}
          </span>
        </button>
      </div>
    </form>
  );
};