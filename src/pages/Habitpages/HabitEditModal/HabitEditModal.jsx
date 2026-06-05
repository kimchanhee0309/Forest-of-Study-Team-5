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
    // DB에 들어가기 전이므로 식별할 고유값이 없음. Date.now()를 사용하여 임시 고유 ID 생성
    const newHabit = {
      id: `new-${Date.now()}`,
      title: "",
      habitLogs: [{ isChecked: false }],
    };
    // 스프레드 연산자를 사용하여 기존 배열에 새 객체를 추가
    setEditHabits((prev) => [...prev, newHabit]);
    setEditingId(newHabit.id);
  };

  const handleChange = (id, newTitle) => {
    // map을 돌면서 수정 중인 아이템의 title만 업데이트
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
                {/* editingId와 현재 렌더링 중인 아이템 id가 같으면 input 태그를 보여주어 수정 모드로 전환 */}
                {editingId === habit.id ? (
                  <input
                    type="text"
                    className={styles.editItemInput}
                    value={habit.title}
                    onChange={(e) => handleChange(habit.id, e.target.value)}
                    // onBlur 이벤트를 사용해 인풋 바깥을 클릭하면 수정 모드를 종료함
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

        {/* 플러스 버튼을 리스트 흐름과 분리하여 간격을 통제하기 위해 ul 태그 바깥에 배치 */}
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
