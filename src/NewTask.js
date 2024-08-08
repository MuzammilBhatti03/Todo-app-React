import React, { useEffect } from 'react';

const NewTask = ({
  showModal,
  setShowModal,
  taskName,
  setTaskName,
  taskDate,
  setTaskDate,
  handleAddTodo,
  handleEditSave,
  isEditMode
}) => {
  
  // If the component is in edit mode, update the title
  useEffect(() => {
    if (isEditMode) {
      document.title = 'Edit Task';
    } else {
      document.title = 'Add New Task';
    }
  }, [isEditMode]);

  // Handle the form submission (add or edit based on mode)
  const handleSave = () => {
    if (isEditMode) {
      handleEditSave();
    } else {
      handleAddTodo();
    }
  };

  // If not showing the modal, return null
  if (!showModal) {
    return null;
  }
  const crossbtn=()=>{
    setTaskName('');
    setTaskDate('');
    setShowModal(false);
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={crossbtn}>&times;</span>
        <h2>{isEditMode ? 'Edit Task' : 'Add New Task'}</h2>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Task Name"
        />
        <input
          type="date"
          value={taskDate}
          onChange={(e) => setTaskDate(e.target.value)}
          placeholder="Task Date"
          min={new Date().toISOString().split('T')[0]}
        />
        <button onClick={handleSave}>
          {isEditMode ? 'Save Changes' : 'Add Task'}
        </button>
      </div>
    </div>
  );
};

export default NewTask;
