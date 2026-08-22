/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { userSchema } from "../schemas/userSchema";
import { useFormStore } from "../store/userFormStore";
import { useAreaStore } from "../../areas";

export const UserForm = ({
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
    submitError,
    setSubmitError
  } = useFormStore();

  const { cities, areas, fetchCities, fetchAreas } = useAreaStore();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: initialData || defaultValues
  });

  useEffect(() => {
    fetchCities();
  }, []);

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

  const citySelection = (e)=>{
    fetchAreas({ parent_id: Number(e.target.value) })
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 space-y-4">
      {/* ----- الصف الأول: الاسم ورقم الهاتف ----- */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
            Full Name
          </label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="e.g. John Doe"
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
            Phone Number
          </label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="e.g. 123-456-7890"
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
      </div>

      {/* ----- البريد الإلكتروني ----- */}
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
              placeholder="e.g. john.doe@company.com"
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

      {/* ----- الصف الثاني: الدور والوكالة ----- */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
            Job Title / Role
          </label>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              >
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
                <option value="citizen">Citizen</option>
              </select>
            )}
          />
          {errors.role && (
            <p className="text-xs text-rose-500 mt-1">{errors.role.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
            Agency
          </label>
          <Controller
            name="agency"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                disabled={field.value == null}
                className={`w-full px-3.5 py-2 border-slate-200 ${
                  field.value == null
                    ? "bg-gray-500 text-mauve-300"
                    : "bg-slate-50 dark:bg-slate-900 border text-slate-800 dark:text-slate-100"
                } dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30`}
              >
                <option value="Engineering">Engineering</option>
                <option value="Product">Product</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Finance">Finance</option>
                <option value="Analytics">Analytics</option>
              </select>
            )}
          />
        </div>
      </div>

      {/* ----- الصف الثالث: المنطقة والحالة ----- */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
            City
          </label>
          <Controller
            name="parent_id"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                onChange={citySelection}
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              >
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))}
              </select>
            )}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
            Area
          </label>
          <Controller
            name="area"
            control={control}
            render={({ field }) => (
              <select
              disabled={ areas.length == 0 }
                {...field}
                onChange={(e) => field.onChange(e.target.value)}
                className={`w-full px-3.5 py-2 ${
                  areas.length == 0
                    ? "bg-gray-500 text-mauve-300"
                    : "bg-slate-50 dark:bg-slate-900 border text-slate-800 dark:text-slate-100"
                } border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30`}
              >
                {areas.map((area) => (
                  <option key={area.id} value={area.id}>{area.name}</option>
                ))}
              </select>
            )}
          />
        </div>
      </div>
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

      {/* ----- عرض الخطأ العام (إن وجد) ----- */}
      {submitError && (
        <p className="text-sm text-rose-500 bg-rose-50 dark:bg-rose-900/20 p-2 rounded-xl">
          {submitError}
        </p>
      )}

      {/* ----- أزرار الإجراءات ----- */}
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
              : submitLabel || (initialData ? "Update Record" : "Save Record")}
          </span>
        </button>
      </div>
    </form>
  );
};
