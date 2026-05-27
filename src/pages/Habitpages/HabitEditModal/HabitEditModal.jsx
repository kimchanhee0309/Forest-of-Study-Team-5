import { useState } from "react";
import styles from "./HabitEditModal.module.css";
import HabitItem from "../../../components/habit/HabitItem/HabitItem";
import icAdd from "../../../assets/icons/ic_plus.png";

function HabitEditModal({ habits, onClose, onSave }) {
  // 모달 안에서만 수정하고, 저장 눌렀을 때만 반영하려고 복사본 만듦
  const [editHabits, setEditHabits] = useState(habits);

  // 지금 어떤 습관을 클릭해서 수정 중인지 id 저장
  const [editingId, setEditingId] = useState(null);

  // 휴지통 눌렀을 때 리스트에서 빼는 함수
  const handleDelete = (id) => {
    setEditHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

  // + 버튼 눌렀을 때 새 습관 추가하는 함수
  const handleAdd = () => {
    const newHabit = {
      id: Date.now(), // 겹치지 않게 시간으로 임시 id 줌
      title: "",
      isCompleted: false,
    };
    setEditHabits((prev) => [...prev, newHabit]);
    setEditingId(newHabit.id);
  };

  // 인풋창에 글씨 쓸 때마다 업데이트
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
              {/* 공용 컴포넌트 재사용 */}
              <HabitItem
                onClickItem={() => setEditingId(habit.id)}
                onDelete={() => handleDelete(habit.id)}
              >
                {/* 현재 클릭한 놈이면 input을 보여주고 아니면 그냥 글씨 보여줌 */}
                {editingId === habit.id ? (
                  <input
                    type="text"
                    className={styles.editItemInput}
                    value={habit.title}
                    onChange={(e) => handleChange(habit.id, e.target.value)}
                    onBlur={() => setEditingId(null)} // 바깥 클릭하면 수정 끝남
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
            {/* 플러스 버튼을 가운데 맞추기 위해 휴지통 크기만큼 투명 여백 넣음 */}
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
