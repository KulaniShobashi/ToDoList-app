function TopicCard({
  topic,
  subTopicInputs,
  canCreate,
  canDelete,
  toggleSelectTopic,
  deleteTopic,
  handleSubTopicChange,
  addSubTopic,
  toggleSubTopic,
  deleteSubTopic,
  updateSubTopicDescription,
}) {
  return (
    <div className={`topic-card ${topic.deleted ? "deleted" : ""}`}>
      <div className="topic-header">
        <div className="topic-title-row">
          <input
            type="checkbox"
            checked={topic.selected || false}
            disabled={topic.deleted}
            onChange={() => toggleSelectTopic(topic.id)}
          />

          <div>
            <h2>{topic.title}</h2>

            {topic.deleted && (
              <p className="deleted-marker">
                Deleted by {topic.deletedBy} on {topic.deletedAt}
              </p>
            )}
          </div>
        </div>

        <button
          className="delete-btn"
          disabled={topic.deleted || !canDelete}
          onClick={() => deleteTopic(topic.id)}
        >
          Delete
        </button>
      </div>

      {!topic.deleted && (
        <div className="subtopic-input-row">
          <input
            type="text"
            placeholder="Enter subtopic..."
            value={subTopicInputs[topic.id] || ""}
            disabled={!canCreate}
            onChange={(e) => handleSubTopicChange(topic.id, e.target.value)}
          />

          <button disabled={!canCreate} onClick={() => addSubTopic(topic.id)}>
            Add
          </button>
        </div>
      )}

      <ul className="subtopic-list">
        {topic.subTopics.map((subTopic) => (
          <li
            key={subTopic.id}
            className={`subtopic-item ${subTopic.deleted ? "deleted" : ""}`}
          >
            <div className="subtopic-header">
              <label className="subtopic-title">
                <input
                  type="checkbox"
                  checked={subTopic.completed || false}
                  disabled={topic.deleted || subTopic.deleted}
                  onChange={() => toggleSubTopic(topic.id, subTopic.id)}
                />

                <div>
                  <span className={subTopic.completed ? "completed" : ""}>
                    {subTopic.title}
                  </span>

                  {subTopic.deleted && (
                    <p className="deleted-marker">
                      Deleted by {subTopic.deletedBy} on {subTopic.deletedAt}
                    </p>
                  )}
                </div>
              </label>

              <button
                className="subtopic-delete-btn"
                disabled={subTopic.deleted || !canDelete}
                onClick={() => deleteSubTopic(topic.id, subTopic.id)}
              >
                ×
              </button>
            </div>

            <textarea
              placeholder="Add description..."
              value={subTopic.description || ""}
              disabled={topic.deleted || subTopic.deleted || !canCreate}
              onChange={(e) =>
                updateSubTopicDescription(topic.id, subTopic.id, e.target.value)
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopicCard;