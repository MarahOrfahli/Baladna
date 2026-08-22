// src/components/ReportForm.jsx
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { reportSchema } from "../schemas/reportSchema";
import { useReportFormStore } from "../store/reportFormStore";

const ReportForm = ({
  submitLabel,
  cancelLabel = "Cancel",
  onSubmit,
  initialData,
  onClose,
  // قوائم الخيارات
  categories = [],
  areas = [],
  agencies = [],
  reporters = [],
}) => {
  const {
    defaultValues,
    setDefaultValues,
    isSubmitting,
    setSubmitting,
    submitError,
    setSubmitError,
  } = useReportFormStore();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reportSchema),
    defaultValues: initialData || defaultValues,
  });

  useEffect(() => {
    if (initialData) {
      // تحويل البيانات القادمة من API إلى صيغة النموذج
      const formData = {
        ...initialData,
        category_id: initialData.category?.id || null,
        area_id: initialData.area?.id || null,
        agency_id: initialData.agency?.id || null,
        reporter_id: initialData.reporter?.id || null,
      };
      setDefaultValues(formData);
      reset(formData);
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
      {/* العنوان */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
          Title <span className="text-rose-500">*</span>
        </label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Brief title of the issue"
              className={`w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border 
              ${errors.title ? "border-rose-500" : "border-slate-200 dark:border-slate-700"}
              rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30`}
            />
          )}
        />
        {errors.title && <p className="text-xs text-rose-500 mt-1">{errors.title.message}</p>}
      </div>

      {/* الوصف */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
          Description <span className="text-rose-500">*</span>
        </label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              rows={3}
              placeholder="Detailed description of the issue"
              className={`w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border 
              ${errors.description ? "border-rose-500" : "border-slate-200 dark:border-slate-700"}
              rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30`}
            />
          )}
        />
        {errors.description && <p className="text-xs text-rose-500 mt-1">{errors.description.message}</p>}
      </div>

      {/* العنوان الجغرافي */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
          Address <span className="text-rose-500">*</span>
        </label>
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="e.g. Karrada, Baghdad"
              className={`w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border 
              ${errors.address ? "border-rose-500" : "border-slate-200 dark:border-slate-700"}
              rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30`}
            />
          )}
        />
        {errors.address && <p className="text-xs text-rose-500 mt-1">{errors.address.message}</p>}
      </div>

      {/* خط الطول والعرض في صف واحد */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
            Latitude
          </label>
          <Controller
            name="latitude"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="e.g. 33.3010"
                className={`w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border 
                ${errors.latitude ? "border-rose-500" : "border-slate-200 dark:border-slate-700"}
                rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30`}
              />
            )}
          />
          {errors.latitude && <p className="text-xs text-rose-500 mt-1">{errors.latitude.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
            Longitude
          </label>
          <Controller
            name="longitude"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="e.g. 44.3610"
                className={`w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border 
                ${errors.longitude ? "border-rose-500" : "border-slate-200 dark:border-slate-700"}
                rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30`}
              />
            )}
          />
          {errors.longitude && <p className="text-xs text-rose-500 mt-1">{errors.longitude.message}</p>}
        </div>
      </div>

      {/* الحالة والأولوية */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
            Status
          </label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              >
                <option value="submitted">Submitted</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="cancelled">Cancelled</option>
              </select>
            )}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
            Priority
          </label>
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            )}
          />
        </div>
      </div>

      {/* القوائم المنسدلة للكائنات المرتبطة */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
            Category
          </label>
          <Controller
            name="category_id"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                value={field.value ?? ""}
                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              >
                <option value="">None</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
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
            name="area_id"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                value={field.value ?? ""}
                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              >
                <option value="">None</option>
                {areas.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.name}
                  </option>
                ))}
              </select>
            )}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
            Agency
          </label>
          <Controller
            name="agency_id"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                value={field.value ?? ""}
                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              >
                <option value="">None</option>
                {agencies.map((agency) => (
                  <option key={agency.id} value={agency.id}>
                    {agency.name}
                  </option>
                ))}
              </select>
            )}
          />
        </div>
      </div>

      {/* حقل المبلغ عن التقرير (اختياري) */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
          Reporter
        </label>
        <Controller
          name="reporter_id"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              value={field.value ?? ""}
              onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            >
              <option value="">None</option>
              {reporters.map((reporter) => (
                <option key={reporter.id} value={reporter.id}>
                  {reporter.name}
                </option>
              ))}
            </select>
          )}
        />
      </div>

      {/* ملاحظات إضافية */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
          Public Note
        </label>
        <Controller
          name="public_note"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              rows={2}
              placeholder="Any public note..."
              className={`w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border 
              ${errors.public_note ? "border-rose-500" : "border-slate-200 dark:border-slate-700"}
              rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30`}
            />
          )}
        />
      </div>

      {/* أسباب الرفض والحل (تظهر فقط في حالات معينة) */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
            Rejection Reason
          </label>
          <Controller
            name="rejection_reason"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Reason for rejection"
                className={`w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border 
                ${errors.rejection_reason ? "border-rose-500" : "border-slate-200 dark:border-slate-700"}
                rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30`}
              />
            )}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
            Resolution Note
          </label>
          <Controller
            name="resolution_note"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="How was it resolved?"
                className={`w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border 
                ${errors.resolution_note ? "border-rose-500" : "border-slate-200 dark:border-slate-700"}
                rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30`}
              />
            )}
          />
        </div>
      </div>

      {/* تواريخ الحل والإلغاء - يمكن إضافتها كـ date inputs */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
            Resolved At
          </label>
          <Controller
            name="resolved_at"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="datetime-local"
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.value || null)}
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
            )}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
            Cancelled At
          </label>
          <Controller
            name="cancelled_at"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="datetime-local"
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.value || null)}
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
            )}
          />
        </div>
      </div>

      {/* عرض الخطأ العام */}
      {submitError && (
        <p className="text-sm text-rose-500 bg-rose-50 dark:bg-rose-900/20 p-2 rounded-xl">
          {submitError}
        </p>
      )}

      {/* الأزرار */}
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
              : submitLabel || (initialData ? "Update Report" : "Save Report")}
          </span>
        </button>
      </div>
    </form>
  );
};

export default ReportForm;