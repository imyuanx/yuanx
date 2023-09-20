import { ChangeEvent, useEffect, useState } from 'react';
import useNotes from '@/common/useNotes';

function NoteModal({
  onClose,
  onConfirm: _onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [noteData, setNoteData] = useState({ title: '', content: '' });

  const { addNote } = useNotes();

  useEffect(() => {
    const keyupHandle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keyup', keyupHandle);

    return () => {
      document.removeEventListener('keyup', keyupHandle);
    };
  }, []);

  const onConfirm = () => {
    const { title, content } = noteData;
    addNote(title, content, 0, 0).then((res) => {
      _onConfirm();
    });
  };
  const onCancel = () => {
    onClose();
  };
  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNoteData({ ...noteData, title: e.currentTarget.value });
  };
  const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNoteData({ ...noteData, content: e.currentTarget.value });
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-white/10 backdrop-blur">
      <div className="flex h-64 w-[70%] flex-col gap-3 rounded-xl border border-solid border-zinc-200 bg-white px-6 py-5 shadow-lg sm:h-64 sm:w-80">
        <div>
          <h2 className="m-0 text-lg">Add Note</h2>
          <h3 className="m-0 text-sm font-normal text-zinc-500">
            Once published, it cannot be edited or deleted
          </h3>
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <input
            className="h-8 rounded-md border border-solid border-zinc-300 px-2 text-base outline-1 outline-offset-4 outline-zinc-400"
            type="text"
            placeholder="Title"
            onChange={onTitleChange}
          />
          <textarea
            className="h-8 flex-1 resize-none rounded-md border border-solid border-zinc-300 px-2 text-base outline-1 outline-offset-4 outline-zinc-400"
            onChange={onContentChange}
            placeholder="Just write something..."
          />
        </div>
        <div className="flex h-9 w-full justify-end gap-2">
          <button
            className="border-1 cursor-pointer rounded-lg border border-solid border-zinc-300 bg-white px-3 text-sm hover:bg-zinc-50"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="border-1 cursor-pointer rounded-lg border border-solid border-zinc-300 bg-black px-3 text-sm text-white hover:bg-zinc-700 active:bg-zinc-950"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteModal;
