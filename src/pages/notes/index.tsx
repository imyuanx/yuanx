'use client';

import { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import useNotes from '@/common/useNotes';
import AddNote from '@/components/AddNote';
import NoteNode from '@/components/NoteNode';
import LoadingIcon from '@/icons/loading.svg';
import {
  Background,
  Controls,
  ReactFlow,
  applyNodeChanges,
} from '@xyflow/react';
import type { Node, NodeChange } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const nodeTypes = {
  note: NoteNode,
};

const Notes: NextPage = () => {
  const { noteList, isLoading, isError, setNotePositionTrigger } = useNotes();

  const [nodes, setNodes] = useState<Node[]>([]);

  useEffect(() => {
    const nodes: Node[] =
      noteList?.map((note) => {
        return {
          id: note.id.toString(),
          type: 'note',
          position: { x: note.x, y: note.y },
          data: {
            title: note.title,
            content: note.content,
            author: note.author,
            createdAt: note.createdAt,
          },
        };
      }) ?? [];
    setNodes(nodes);
  }, [noteList]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onNodeDragStop = useCallback((event: React.MouseEvent, node: Node) => {
    setNotePositionTrigger({
      id: Number(node.id),
      position: {
        x: node.position.x,
        y: node.position.y,
      },
    });
  }, []);

  return (
    <>
      <Head>
        <title>yuanx | Notes</title>
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
          {!isLoading && (
            <ReactFlow
              nodes={nodes}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onNodeDragStop={onNodeDragStop}
            >
              <Background />
              <Controls />
            </ReactFlow>
          )}
        </div>
      </main>
    </>
  );
};

export default Notes;
