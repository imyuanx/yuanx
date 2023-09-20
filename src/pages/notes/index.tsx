'use client';

import { useEffect, useRef } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import useNotes, { NoteInfo, setNoteXY } from '@/common/useNotes';
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
      <div className="bg-white rounded-xl w-60 h-max min-h-[120px] shadow overflow-hidden absolute left-0 top-0">
        <div className="flex justify-center items-end gap-1 py-1 px-3 bg-yellow-400 w-full h-10 box-border border-0 border-b-2 border-zinc-200 border-solid font-semibold notes-handle cursor-move">
          <h1 className="flex-1 text-base truncate m-0">{note.title}</h1>
          <div className="h-full flex items-center">
            <MoveIcon className="mt-1 opacity-10" />
          </div>
        </div>
        <div className="px-4 py-3 pb-5">
          <p className="p-0 m-0 leading-6 underline underline-offset-[6px] dashed text-zinc-600">
            {note.content}
          </p>
        </div>
      </div>
    </Draggable>
  );
};

const Notes: NextPage = () => {
  const { noteList, setNoteXY, isLoading, isError } = useNotes();

  return (
    <>
      <Head>
        <title>x Yuan | Notes</title>
      </Head>
      <main className="mx-auto my-0 box-content flex w-full flex-col items-center px-7 pb-7 pt-[60px]">
        <div className="mt-[0.67em] w-full min-w-[330px] max-w-[650px]">
          <h1 className="text-[2em] font-bold">My Notes</h1>
          <div className="text-[#737373] dark:text-[#808080]">
            Welcome, this is a noteboard.
          </div>
        </div>
        <div className="relative mt-[40px] w-full h-full overflow-auto">
          {noteList?.map((note) => (
            <Note setNoteXY={setNoteXY} key={note.id} note={note} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Notes;
