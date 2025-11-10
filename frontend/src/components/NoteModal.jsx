import { useEffect, useState } from "react";

function NoteModal({ isOpen, onClose, note, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setTitle(note ? note.title : "");
    setDescription(note ? note.description : "");
  }, [note, isOpen]);

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    const payload =
      note && note._id
        ? {
            _id: note._id,
            title: title.trim(),
            description: description.trim(),
          }
        : { title: title.trim(), description: description.trim() };
    onSave(payload);
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <form
        onSubmit={handleSubmit}
        className="relative bg-white rounded-lg p-6 w-11/12 max-w-md shadow-2xl transform transition-all duration-200"
      >
        <h2 className="text-xl font-semibold mb-4 text-[#2E2E2E]">
          {note ? "Edit Note" : "Create Note"}
        </h2>

        <div className="mb-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            className="w-full px-3 py-2 border border-slate-200 rounded-md outline-none transition-colors duration-150 focus:border-[#0E7490] focus:ring-2 focus:ring-[#0E7490]/20"
          />
        </div>

        <div className="mb-4">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Note description"
            className="w-full px-3 py-2 border border-slate-200 rounded-md outline-none min-h-[100px] transition-colors duration-150 focus:border-[#0E7490] focus:ring-2 focus:ring-[#0E7490]/20"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-[#F3F4F6] text-[#2E2E2E] cursor-pointer transition-colors duration-150 hover:bg-[#E5E7EB]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-[#0E7490] text-[#FDFBF7] cursor-pointer transition-colors duration-150 hover:bg-[#0B6B75]"
          >
            {note ? "Save" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoteModal;
