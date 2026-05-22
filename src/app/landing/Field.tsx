type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  textarea?: boolean;
};

export function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  textarea = false,
}: FieldProps) {
  return (
    <label className="field">
      {textarea ? (
        <textarea value={value} onChange={(event) => onChange(event.target.value)} placeholder={label} rows={5} />
      ) : (
        <input type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={label} />
      )}
      {error ? <small>{error}</small> : null}
    </label>
  );
}
