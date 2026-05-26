import { useState } from "react";
import styles from "./HabitEditModal.module.css";
import icTrash from "../../../assets/icons/ic_trash.svg"; // 확장자 다시 확인해주세요!

function HabitEditModal({ habits, onClose, onSave }) {
  const [editHabits, setEditHabits] = useState(habits);

  // ✨ 새로 추가: 현재 어떤 항목을 수정 중인지 추적하는 상태 (아무것도 안 누르면 null)
  const [editingId, setEditingId] = useState(null);

  const handleDelete = (id) => {
    setEditHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

  const handleAdd = () => {
    const newHabit = {
      id: Date.now(),
      title: "", // 처음엔 빈 텍스트
      isCompleted: false,
    };
    setEditHabits((prev) => [...prev, newHabit]);
    // ✨ 추가하자마자 바로 입력 모드로 들어가게 세팅
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
              {/* ✨ 핵심 로직: 현재 수정 중인 ID면 input을 보여주고, 아니면 span을 보여줍니다 */}
              <div
                className={styles.inputWrapper}
                onClick={() => setEditingId(habit.id)}
              >
                {editingId === habit.id ? (
                  <input
                    type="text"
                    className={styles.editItemInput}
                    value={habit.title}
                    onChange={(e) => handleChange(habit.id, e.target.value)}
                    onBlur={() =>
                      setEditingId(null)
                    } /* 클릭 해제 시 텍스트로 돌아감 */
                    autoFocus /* 나타날 때 바로 커서 깜빡이게 */
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
              </div>

              <button
                type="button"
                className={styles.deleteBtn}
                onClick={() => handleDelete(habit.id)}
              >
                <img src={icTrash} alt="삭제" className={styles.icon} />
              </button>
            </li>
          ))}

          <li className={styles.editItemRow}>
            <button type="button" className={styles.addBtn} onClick={handleAdd}>
              +
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
