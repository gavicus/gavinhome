
export const Input = ({name, label, value, onChange}) => {
  return (
    <section className="form-element">
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
      />
    </section>
  );
}
