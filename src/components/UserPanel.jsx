function UserPanel({ currentUser, setCurrentUser }) {
  return (
    <div className="user-panel">
      <p>
        Current user: <strong>{currentUser.name}</strong>
      </p>

      <div className="user-controls">
        <div className="control-group">
          <label>Name</label>

          <input
            type="text"
            value={currentUser.name}
            onChange={(e) =>
              setCurrentUser({
                ...currentUser,
                name: e.target.value,
              })
            }
          />
        </div>

        <div className="control-group">
          <label>Role</label>

          <select
            value={currentUser.role}
            onChange={(e) =>
              setCurrentUser({
                ...currentUser,
                role: e.target.value,
              })
            }
          >
            <option value="Admin">Admin</option>
            <option value="Dept-head">Dept-head</option>
            <option value="Learner">Learner</option>
            <option value="Viewer">Viewer</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default UserPanel;