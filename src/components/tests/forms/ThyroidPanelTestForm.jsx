import React from 'react';

const ThyroidPanelTestForm = ({ report, data, onChange }) => {
  if (!data) return null;
  const v = data.values || {};
  const update = (k,val)=> onChange({ values: { ...v, [k]: val } });

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-700">Thyroid Panel</h4>
      <div className="grid sm:grid-cols-3 gap-4">
        <Field label="TSH (mIU/L)">
          <input className="input" type="number" step="0.01" value={v.tsh || ''} onChange={e=>update('tsh', e.target.value)} />
        </Field>
        <Field label="Free T4 (ng/dL)">
          <input className="input" type="number" step="0.01" value={v.ft4 || ''} onChange={e=>update('ft4', e.target.value)} />
        </Field>
        <Field label="Free T3 (pg/mL)">
          <input className="input" type="number" step="0.01" value={v.ft3 || ''} onChange={e=>update('ft3', e.target.value)} />
        </Field>
      </div>
      <Field label="Notes">
        <textarea
          className="input h-24 resize-none"
          value={data.notes || ''}
          onChange={(e) => onChange({ notes: e.target.value })}
        />
      </Field>
    </div>
  );
};

const Field = ({ label, children }) => (
  <label className="block text-xs">
    <span className="text-gray-600 font-medium">{label}</span>
    <div className="mt-1">{children}</div>
  </label>
);

export default ThyroidPanelTestForm;