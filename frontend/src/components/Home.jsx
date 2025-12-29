import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { MdOutlineAddCircle } from "react-icons/md";
import NoteModal from "./NoteModal";

function Home({ search = "" }) {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editNote, setEditNote] = useState(null);
  //   /console.log(notes);

  async function handleEditNote(note) {
    setEditNote(note);
    setIsModalOpen(true);
  }

  async function fetchNotes() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found.please login again!");
        navigate("/login");
        return;
      }
      const { data } = await api.get("/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(data.notes);
      //console.log("Fetched notes response:", data);
    } catch (err) {
      setError("Failed to fetch notes");
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  async function addNote() {}

  async function handleDelete(id) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in again");
        return;
      }

      await api.delete(`/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // remove from UI
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (err) {
      setError("Error deleting note:", err.response?.data || err.message);
      //alert(err.response?.data?.msg || "Failed to delete note");
    }
  }

  function addNote() {
    setEditNote(null);
    setIsModalOpen(true);
  }

  async function handleSaveNote(payload) {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      if (payload._id) {
        const { data } = await api.put(
          `/api/notes/${payload._id}`,
          { title: payload.title, description: payload.description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const updated = data.updatedNote || data.note || data;
        setNotes((prev) =>
          prev.map((n) => (n._id === payload._id ? updated : n))
        );
      } else {
        const { data } = await api.post(
          "/api/notes",
          { title: payload.title, description: payload.description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const created = data.note || data;
        setNotes((prev) => [created, ...prev]);
      }

      setEditNote(null);
      setIsModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.msg || err.message || "Failed to save note");
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* ✅ Show error if exists */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditNote(null);
        }}
        note={editNote}
        onSave={handleSaveNote}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg-grid-cols-4 gap-4">
        {(() => {
          const s = (search || "").toLowerCase().trim();
          const displayed = s
            ? notes.filter(
                (n) =>
                  (n.title || "").toLowerCase().includes(s) ||
                  (n.description || "").toLowerCase().includes(s)
              )
            : notes;

          return displayed.length > 0
            ? displayed.map((note) => (
                <div
                  key={note._id}
                  className="bg-[#FFE5B4] p-4 rounded-lg shadow-lg transform-gpu transition-transform duration-200 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
                >
                  <h3 className="text-[#2E2E2E] font-semibold mb-2">
                    {note.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{note.description}</p>
                  <p className="text-gray-500 text-sm ">
                    {new Date(note.updatedAt).toLocaleString()}
                  </p>
                  <div className="flex gap-5 mt-4 ">
                    <button
                      onClick={() => handleEditNote(note)}
                      className="bg-[#0E7490] hover:bg-[#155E75] text-[#FDFBF7] py-1 px-3 rounded-md cursor-pointer text-center "
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(note._id)}
                      className="bg-[#F87171] hover:bg-[#DC2626] text-[#FDFBF7] py-1 px-3 rounded-md cursor-pointer text-center"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            : !error && <p className="text-gray-600">No notes found.</p>;
        })()}
      </div>
      <button onClick={() => addNote()} className="cursor-pointer">
        <MdOutlineAddCircle
          className="
    fixed bottom-6 right-6 
    text-6xl text-[#0E7490]   /* Muted teal */
    drop-shadow-lg 
    transition-all duration-300 
    hover:scale-125 hover:text-[#155E75] 
    cursor-pointer
  "
        />
      </button>
    </div>
  );
}

export default Home;
