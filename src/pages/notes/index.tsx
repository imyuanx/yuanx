'use client';

import { useRef, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import useNotes, { NoteInfo, setNoteXY } from '@/common/useNotes';
import NoteModal from '@/components/NoteModal';
import AddIcon from '@/icons/add.svg';
import LoadingIcon from '@/icons/loading.svg';
import MoveIcon from '@/icons/move.svg';
import Draggable, { DraggableEventHandler } from 'react-draggable';

const Note = ({
  note,
  setNoteXY,
}: {
  note: NoteInfo;
  setNoteXY: setNoteXY;
}) => {
  const position = useRef({ x: note.x, y: note.y }).current;

  const onStop: DraggableEventHandler = (_, data) => {
    const { x, y } = data;
    if (x !== position.x && y !== position.y) {
      position.x = x;
      position.y = y;
      setNoteXY(note.id, position);
    }
  };

  return (
    <Draggable
      handle=".notes-handle"
      defaultPosition={{ x: note.x, y: note.y }}
      bounds="parent"
      onStop={onStop}
    >
      <div className="absolute left-0 top-0 h-max min-h-[120px] w-60 overflow-hidden rounded-xl bg-white shadow">
        <div className="notes-handle box-border flex h-10 w-full cursor-move items-end justify-center gap-1 border-0 border-b-2 border-solid border-zinc-200 bg-yellow-400 px-3 py-1 font-semibold">
          <h1 className="m-0 flex-1 truncate text-base">{note.title}</h1>
          <div className="flex h-full items-center">
            <MoveIcon className="mt-1 opacity-10" />
          </div>
        </div>
        <div className="px-4 py-3 pb-5">
          <p className="dashed m-0 whitespace-pre-line p-0 leading-6 text-zinc-600 underline underline-offset-[6px]">
            {note.content}
          </p>
        </div>
      </div>
    </Draggable>
  );
};

const Notes: NextPage = () => {
  const { noteList, setNoteXY, isLoading, isError, mutate } = useNotes();

  const [modalVisible, setModalVisible] = useState(false);

  const modalShow = () => {
    setModalVisible(true);
  };

  const modalHide = () => {
    setModalVisible(false);
  };
  const onConfirm = () => {
    mutate();
    modalHide();
  };

  return (
    <>
      <Head>
        <title>x Yuan | Notes</title>
      </Head>
      <main className="mx-auto my-0 box-content flex w-full flex-col items-center px-7 pb-7 pt-[60px]">
        <div className="mt-[0.67em] w-full min-w-[330px] max-w-[650px]">
          <h1 className="flex items-center gap-1 text-[2em] font-bold">
            My Notes
            <AddIcon
              className="mt-[2px] w-6 cursor-pointer text-[#808080] hover:text-black dark:hover:text-white"
              onClick={modalShow}
            />
          </h1>
          <div className="text-[#737373] dark:text-[#808080]">
            Welcome, this is a noteboard.
          </div>
        </div>
        <div className="note-list-container relative mt-[40px] h-full w-full overflow-auto">
          {isLoading && (
            <div className="flex w-full items-center justify-center gap-2 text-xl font-light">
              <LoadingIcon /> Loading...
            </div>
          )}
          {isError && (
            <div className="flex w-full items-center justify-center gap-2 text-xl font-light">
              Sorry, there has an error.
            </div>
          )}
          {!isLoading &&
            !isError &&
            noteList?.map((note) => (
              <Note setNoteXY={setNoteXY} key={note.id} note={note} />
            ))}
        </div>
        {modalVisible && (
          <NoteModal onClose={modalHide} onConfirm={onConfirm} />
        )}
      </main>
    </>
  );
};

export default Notes;
