import { useEffect, useState } from "react";
import UserPanel from "./UserPanel";
import PermissionTable from "./PermissionTable";
import TopicCard from "./TopicCard";

function TodoApp() {
  const [topics, setTopics] = useState(() => {
    const savedTopics = localStorage.getItem("topics");
    return savedTopics ? JSON.parse(savedTopics) : [];
  });

  const [currentUser, setCurrentUser] = useState({
    name: "Josh",
    role: "Admin",
  });

  const [newTopic, setNewTopic] = useState("");
  
  const [subTopicInputs, setSubTopicInputs] = useState({});

  const canCreate =
    currentUser.role === "Admin" || currentUser.role === "Learner";

  const canDelete =
    currentUser.role === "Admin" || currentUser.role === "Dept-head";
  

  useEffect(() => {
    localStorage.setItem("topics", JSON.stringify(topics));
  }, [topics]);

  function addTopic() {
    if (newTopic.trim() === "" || !canCreate) return;

    const topic = {
      id: Date.now(),
      title: newTopic,
      subTopics: [],
      selected: false,
      deleted: false,
      deletedBy: null,
      deletedAt: null,
    };

    setTopics([...topics, topic]);
    setNewTopic("");
  }

  function deleteTopic(topicId) {
    if (!canDelete) return;

    const updatedTopics = topics.map((topic) =>
      topic.id === topicId && !topic.deleted
        ? {
            ...topic,
            deleted: true,
            deletedBy: currentUser.name,
            deletedAt: new Date().toLocaleDateString(),
            selected: false,
          }
        : topic
    );

    setTopics(updatedTopics);
  }

  function toggleSelectTopic(topicId) {
    const updatedTopics = topics.map((topic) =>
      topic.id === topicId && !topic.deleted
        ? { ...topic, selected: !topic.selected }
        : topic
    );

    setTopics(updatedTopics);
  }

  function deleteSelectedTopics() {
    if (!canDelete) return;

    const updatedTopics = topics.map((topic) =>
      topic.selected && !topic.deleted
        ? {
            ...topic,
            deleted: true,
            deletedBy: currentUser.name,
            deletedAt: new Date().toLocaleDateString(),
            selected: false,
          }
        : topic
    );

    setTopics(updatedTopics);
  }

  function handleSubTopicChange(topicId, value) {
    setSubTopicInputs({
      ...subTopicInputs,
      [topicId]: value,
    });
  }

  function addSubTopic(topicId) {
    if (!canCreate) return;

    const subTopicText = subTopicInputs[topicId];
    if (!subTopicText || subTopicText.trim() === "") return;

    const updatedTopics = topics.map((topic) =>
      topic.id === topicId && !topic.deleted
        ? {
            ...topic,
            subTopics: [
              ...topic.subTopics,
              {
                id: Date.now(),
                title: subTopicText,
                description: "",
                completed: false,
                deleted: false,
                deletedBy: null,
                deletedAt: null,
              },
            ],
          }
        : topic
    );

    setTopics(updatedTopics);
    setSubTopicInputs({ ...subTopicInputs, [topicId]: "" });
  }

  function deleteSubTopic(topicId, subTopicId) {
    if (!canDelete) return;

    const updatedTopics = topics.map((topic) => {
      if (topic.id === topicId) {
        return {
          ...topic,
          subTopics: topic.subTopics.map((subTopic) =>
            subTopic.id === subTopicId && !subTopic.deleted
              ? {
                  ...subTopic,
                  deleted: true,
                  deletedBy: currentUser.name,
                  deletedAt: new Date().toLocaleDateString(),
                }
              : subTopic
          ),
        };
      }

      return topic;
    });

    setTopics(updatedTopics);
  }

  function toggleSubTopic(topicId, subTopicId) {
    const updatedTopics = topics.map((topic) => {
      if (topic.id === topicId && !topic.deleted) {
        return {
          ...topic,
          subTopics: topic.subTopics.map((subTopic) =>
            subTopic.id === subTopicId && !subTopic.deleted
              ? { ...subTopic, completed: !subTopic.completed }
              : subTopic
          ),
        };
      }

      return topic;
    });

    setTopics(updatedTopics);
  }

  function updateSubTopicDescription(topicId, subTopicId, description) {
    if (!canCreate) return;

    const updatedTopics = topics.map((topic) => {
      if (topic.id === topicId && !topic.deleted) {
        return {
          ...topic,
          subTopics: topic.subTopics.map((subTopic) =>
            subTopic.id === subTopicId && !subTopic.deleted
              ? { ...subTopic, description }
              : subTopic
          ),
        };
      }

      return topic;
    });

    setTopics(updatedTopics);
  }

  return (
    <div className="app-wrapper">
      <div className="todo-card">
        <h1>My Topics</h1>
        <p>Plan your learning step by step</p>

        <UserPanel
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />

        <PermissionTable />

        <div className="topic-input-row">
          <input
            type="text"
            placeholder="Enter a topic..."
            value={newTopic}
            disabled={!canCreate}
            onChange={(e) => setNewTopic(e.target.value)}
          />

          <button onClick={addTopic} disabled={!canCreate}>
            Add Topic
          </button>
        </div>
        

        {topics.some((topic) => topic.selected && !topic.deleted) && (
          <button
            className="delete-selected-btn"
            onClick={deleteSelectedTopics}
            disabled={!canDelete}
          >
            Delete Selected Topics
          </button>
        )}

        {topics.map((topic) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            subTopicInputs={subTopicInputs}
            canCreate={canCreate}
            canDelete={canDelete}
            toggleSelectTopic={toggleSelectTopic}
            deleteTopic={deleteTopic}
            handleSubTopicChange={handleSubTopicChange}
            addSubTopic={addSubTopic}
            toggleSubTopic={toggleSubTopic}
            deleteSubTopic={deleteSubTopic}
            updateSubTopicDescription={updateSubTopicDescription}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoApp;