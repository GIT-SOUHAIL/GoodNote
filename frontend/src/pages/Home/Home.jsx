import { useEffect, useState } from "react";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import AddEditNotes from "./AddEditNotes";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const { currentUser, loading, errorDispatch } = useSelector(
    (state) => state.user
  );

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  useEffect(() => {
    if (currentUser === null || !currentUser) {
      navigate("/login");
    } else {
      setUserInfo(currentUser?.rest);
      getAllNotes();
    }
  }, []);

  const getAllNotes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/note/all", {
        withCredentials: true,
      });

      if (res.data.success === false) {
        return;
      }

      setAllNotes(res.data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const deleteNote = async (data) => {
    const noteId = data._id;

    try {
      const res = await axios.delete(
        "http://localhost:3000/api/note/delete/" + noteId,
        { withCredentials: true }
      );

      if (res.data.success === false) {
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      getAllNotes();
    } catch (error) {
      toast(error.message);
    }
  };

  const onSearchNote = async (query) => {
    try {
      const res = await axios.get("http://localhost:3000/api/note/search", {
        params: { query },
        withCredentials: true,
      });

      if (res.data.success === false) {
        toast.error(res.data.message);
        return;
      }

      setIsSearch(true);
      setAllNotes(res.data.notes);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />

      <div className="container mx-auto">
        {/* Large SVG Icon Section */}
        {allNotes.length === 0 && (
          <div className="flex justify-center items-center mt-8">
            <svg
              className="h-72 w-72 text-[#4f46e5]"  // Color matching the navbar
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        )}

        {/* Notes Section */}
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 max-md:m-5">
            {allNotes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                date={note.createdAt}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                onEdit={() => handleEdit(note)}
                onDelete={() => deleteNote(note)}
                onPinNote={() => updateIsPinned(note)}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center text-center mt-8">
            <p className="text-xl">No Notes Found</p>
          </div>
        )}
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#4f46e5] transition-all hover:bg-[#4e46e5b5] absolute right-10 bottom-10"
        onClick={() => setOpenAddEditModal({ isShown: true, type: "add", data: null })}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)" } }}
        contentLabel=""
        className="w-[40%] max-md:w-[60%] max-sm:w-[70%] max-h-3/4 bg-white rounded-md mx-auto mt-[7rem] p-5 "
      >
        <AddEditNotes
          onClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
          noteData={openAddEditModal.data}
          type={openAddEditModal.type}
          getAllNotes={getAllNotes}
        />
      </Modal>
    </>
  );
};

export default Home;
