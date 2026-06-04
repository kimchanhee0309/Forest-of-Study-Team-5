import { useState } from "react";
import styles from "./HabitEditModal.module.css";
import HabitItem from "../../../components/habit/HabitItem/HabitItem";
import icAdd from "../../../assets/icons/ic_plus.png";

function HabitEditModal({ habits, onClose, onSave }) {
  const [editHabits, setEditHabits] = useState(habits);
  const [editingId, setEditingId] = useState(null);

  // 1. 습관 삭제 (모달 내 UI 리스트에서만 제거)
  const handleDelete = (id) => {
    setEditHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

  // 2. 신규 습관 추가 (임시 식별자 생성)
  const handleAdd = () => {
    const newHabit = {
      id: `new-${Date.now()}`, // DB 생성 전 식별을 위한 임시 ID 접두사 부여
      title: "",
      habitLogs: [{ isChecked: false }], // 백엔드 필드명 통일
    };
    setEditHabits((prev) => [...prev, newHabit]);
    setEditingId(newHabit.id);
  };

  // 3. 습관 이름 수정 업데이트
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

          <li className={styles.editItemRow}>
            <button type="button" className={styles.addBtn} onClick={handleAdd}>
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
