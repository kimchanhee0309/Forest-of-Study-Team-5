import { useState } from "react";
import styles from "./HabitEditModal.module.css";
// ✨ [추가] 멀리 떨어져 있는 공용 컴포넌트를 폴더 구조에 맞게 정확히 불러옵니다.
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
      id: Date.now(),
      title: "",
      isCompleted: false,
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
              {/* ✨ [핵심] 기존 HTML을 지우고 HabitItem 컴포넌트를 통째로 사용합니다! */}
              <HabitItem
                onClickItem={() => setEditingId(habit.id)}
                onDelete={() => handleDelete(habit.id)}
              >
                {/* HabitItem의 안쪽(children)에 input이나 span을 상황에 맞게 띄워줍니다 */}
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

          <li className={styles.editItemRow}>
            <button type="button" className={styles.addBtn} onClick={handleAdd}>
              {/* 텍스트 + 를 지우고 이미지 태그로 변경! */}
              <img src={icAdd} alt="추가" className={styles.addIcon} />
            </button>
            <div className={styles.emptySpace}></div>
          </li>
        </ul>

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
