import { useState } from "react";

const AddEditNotes = ({ onClose, noteData, type, getAllNotes }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [error, setError] = useState(null);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }
    setError(null);
    if (type === "edit") {
      editNote();
    } else {
      addNote();
    }
  };

  const editNote = async () => {
    const res = await fetch(
      `http://localhost:3000/api/note/edit/${noteData._id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, tags }),
        credentials: "include",
      }
    );
    const data = await res.json();
    if (!data.success) {
      setError(data.message);
      return;
    }
    getAllNotes();
    onClose();
  };

  const addNote = async () => {
    const res = await fetch("http://localhost:3000/api/note/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, tags }),
      credentials: "include",
    });
    const data = await res.json();
    if (!data.success) {
      setError(data.message);
      return;
    }
    getAllNotes();
    onClose();
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
    }
    setTagInput("");
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-indigo-800">
          {type === "edit" ? "Edit Note" : "Create Note"}
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-indigo-700 mb-1">
            Title
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-indigo-700 mb-1">
            Content
          </label>
          <textarea
            rows={5}
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder="Enter content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-indigo-700 mb-1">
            Tags
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              className="flex-grow p-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Add a tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />
            <button
              onClick={handleAddTag}
              className="bg-indigo-600 text-white px-3 py-2 rounded hover:bg-indigo-700"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-indigo-500 text-white text-sm px-2 py-1 rounded flex items-center gap-2"
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="text-red-200 hover:text-red-400"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            {type === "edit" ? "Update Note" : "Create Note"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditNotes;
