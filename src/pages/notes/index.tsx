'use client';

import { useRef } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import useNotes, { NoteInfo } from '@/common/useNotes';
import AddNote from '@/components/AddNote';
import LoadingIcon from '@/icons/loading.svg';
import MoveIcon from '@/icons/move.svg';
import Draggable, { DraggableEventHandler } from 'react-draggable';

const Note = ({ note }: { note: NoteInfo }) => {
  const { setNotePositionTrigger } = useNotes();
  const position = useRef({ x: note.x, y: note.y }).current;

  const onStop: DraggableEventHandler = (_, data) => {
    const { x, y } = data;
    if (x !== position.x && y !== position.y) {
      position.x = x;
      position.y = y;
      setNotePositionTrigger({ id: note.id, position });
    }
  };

  return (
    <Draggable
      handle=".notes-handle"
      defaultPosition={{ x: note.x, y: note.y }}
      bounds="parent"
      onStop={onStop}
    >
      <div className="absolute left-0 top-0 flex h-max min-h-[120px] w-60 flex-col overflow-hidden rounded-xl bg-white shadow dark:border dark:border-solid dark:border-zinc-800 dark:bg-[#121314] dark:shadow-none">
        <div className="notes-handle box-border flex h-10 w-full cursor-move items-end justify-center gap-1 border-0 border-b-2 border-solid border-zinc-200 bg-yellow-400 px-3 py-1 font-semibold dark:bg-yellow-500">
          <h1 className="m-0 flex-1 truncate text-base">{note.title}</h1>
          <div className="flex h-full items-center">
            <MoveIcon className="mt-1 opacity-10 dark:opacity-30" />
          </div>
        </div>
        <div className="flex-1 px-4 py-3">
          <p className="dashed m-0 whitespace-pre-line p-0 leading-6 text-zinc-600 underline underline-offset-[6px] dark:text-white">
            {note.content}
          </p>
        </div>
        <div className="bottom-1 flex w-full justify-between px-4 pb-2 text-xs text-zinc-300">
          <div>{note.author}</div>
          <div>{note.createdAt}</div>
        </div>
      </div>
    </Draggable>
  );
};

const Notes: NextPage = () => {
  const { noteList, isLoading, isError } = useNotes();

  return (
    <>
      <Head>
        <title>x Yuan | Notes</title>
      </Head>
      <main className="mx-auto my-0 box-content flex w-full flex-col items-center px-7 pb-7 pt-[60px]">
        <div className="mt-[0.67em] w-full min-w-[330px] max-w-[650px]">
          <h1 className="flex items-center gap-1 text-[2em] font-bold">
            My Notes
            <AddNote />
          </h1>
          <div className="text-[#737373] dark:text-[#808080]">
            Welcome, this is a noteboard.
          </div>
        </div>
        <div className="note-list-container relative mt-10 h-full w-full overflow-auto">
          {isLoading && (
            <div className="flex w-full items-center justify-center gap-2 text-xl font-light">
              <LoadingIcon /> Loading...
            </div>
          )}
          {isError && noteList?.length === 0 && (
            <div className="flex w-full items-center justify-center gap-2 text-xl font-light">
              Sorry, there has an error.
            </div>
          )}
          {!isLoading &&
            noteList?.map((note) => <Note key={note.id} note={note} />)}
        </div>
      </main>
    </>
  );
};

export default Notes;
