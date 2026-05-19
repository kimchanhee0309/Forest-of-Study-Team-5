import { useState } from "react";
import styles from "./Dropdown.module.css";

function Dropdown({ value, options = [], onChange }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (option) => {
    onChange?.(option);
    setOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{value}</span>
        <span className={styles.arrow}>▾</span>
      </button>

      {open && (
        <ul className={styles.menu}>
          {options.map((option) => (
            <li key={option}>
              <button type="button" onClick={() => handleSelect(option)}>
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
