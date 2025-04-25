import MoveIcon from '@/icons/move.svg';

type NoteNodeProps = {
  data: {
    title: string;
    content: string;
    author: string;
    createdAt: string;
  };
};

function NoteNode(props: NoteNodeProps) {
  return (
    <div className="flex h-max min-h-[120px] w-60 flex-col overflow-hidden rounded-xl bg-white shadow dark:border dark:border-solid dark:border-zinc-800 dark:bg-[#121314] dark:shadow-none">
      <div className="notes-handle box-border flex h-10 w-full items-end justify-center gap-1 border-0 border-b-2 border-solid border-zinc-200 bg-yellow-400 px-3 py-1 font-semibold dark:bg-yellow-500">
        <h1 className="m-0 flex-1 truncate text-base">{props.data.title}</h1>
        <div className="flex h-full items-center">
          <MoveIcon className="mt-1 opacity-10 dark:opacity-30" />
        </div>
      </div>
      <div className="flex-1 px-4 py-3">
        <p className="dashed m-0 whitespace-pre-line p-0 leading-6 text-zinc-600 underline underline-offset-[6px] dark:text-white">
          {props.data.content}
        </p>
      </div>
      <div className="bottom-1 flex w-full justify-between px-4 pb-2 text-xs text-zinc-300">
        <div>{props.data.author}</div>
        <div>{props.data.createdAt}</div>
      </div>
    </div>
  );
}

export default NoteNode;
