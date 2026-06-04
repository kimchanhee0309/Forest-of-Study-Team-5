import { useState } from "react";
import styles from "./HabitEditModal.module.css";
import HabitItem from "../../../components/habit/HabitItem/HabitItem";
import icAdd from "../../../assets/icons/ic_plus.png";

function HabitEditModal({ habits, onClose, onSave }) {
  const [editHabits, setEditHabits] = useState(habits);
  const [editingId, setEditingId] = useState(null);

  const handleDelete = (id) => {
    setEditHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

  const handleAdd = () => {
    const newHabit = {
      id: `new-${Date.now()}`,
      title: "",
      habitLogs: [{ isChecked: false }],
    };
    setEditHabits((prev) => [...prev, newHabit]);
    setEditingId(newHabit.id);
  };

  const handleChange = (id, newTitle) => {
    setEditHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, title: newTitle } : habit,
      ),
    );
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>습관 목록</h2>

        <ul className={styles.editList}>
          {editHabits.map((habit) => (
            <li key={habit.id} className={styles.editItemRow}>
              <HabitItem
                onClickItem={() => setEditingId(habit.id)}
                onDelete={() => handleDelete(habit.id)}
              >
                {editingId === habit.id ? (
                  <input
                    type="text"
                    className={styles.editItemInput}
                    value={habit.title}
                    onChange={(e) => handleChange(habit.id, e.target.value)}
                    onBlur={() => setEditingId(null)}
                    autoFocus
                  />
                ) : (
                  <span
                    className={`${styles.editItemText} ${
                      habit.title.trim() === "" ? styles.isEmpty : ""
                    }`}
                  >
                    {habit.title.trim() === "" ? "" : habit.title}
                  </span>
                )}
              </HabitItem>
            </li>
          ))}
        </ul>

        {/* 간격을 명확하게 주기 위해 ul 바깥으로 버튼을 분리 */}
        <button type="button" className={styles.addBtn} onClick={handleAdd}>
          <img src={icAdd} alt="추가" className={styles.addIcon} />
        </button>

        <div className={styles.modalActions}>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>
            취소
          </button>
          <button
            type="button"
            className={styles.saveBtn}
            onClick={() => onSave(editHabits)}
          >
            수정 완료
          </button>
        </div>
      </div>
    </div>
  );
}

export default HabitEditModal;
