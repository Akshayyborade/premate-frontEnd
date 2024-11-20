// ... existing code ...
const Select = ({ 
    label,
    id,
    name,  // Add name prop
    value,
    onChange,
    options = [],
    placeholder = "Select an option",
    disabled = false,
    icon,
    handleIconClick,
    clearable = false,
  }) => {
    // Remove the selectedLabel state since we're showing the label directly in options
    
    const handleChange = (e) => {
      onChange({
        target: {
          name: name || id, // Use name prop if provided, fallback to id
          value: e.target.value
        }
      });
    };
  
    return (
      <div className="input-group">
        {label && (
          <label className="input-label" htmlFor={id}>
            {label}
          </label>
        )}
        <div className="input-wrapper">
          <select
            id={id}
            name={name || id}
            value={value || ''}
            onChange={handleChange}
            className="select-field"
            disabled={disabled}
            aria-label={label}
          >
            {!value && <option value="" disabled>{placeholder}</option>}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {/* ... rest of the component ... */}
        </div>
      </div>
    );
  };