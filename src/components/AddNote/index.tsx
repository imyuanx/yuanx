import { ChangeEvent, useState } from 'react';
import useNotes from '@/common/useNotes';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AddIcon from '@/icons/add.svg';

function AddNote() {
  const [open, setOpen] = useState(false);
  const [noteData, setNoteData] = useState({ title: '', content: '' });
  const { addNote, mutate } = useNotes();

  const onConfirm = () => {
    const { title, content } = noteData; // TODO: check empty
    addNote(title, content, 0, 0).then((res) => {
      mutate();
      setOpen(false);
    });
  };

  const onAddNote = () => {
    setOpen(false);
  };

  const onCancel = () => {
    setOpen(false);
  };

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNoteData({ ...noteData, title: e.currentTarget.value });
  };

  const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNoteData({ ...noteData, content: e.currentTarget.value });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <AddIcon
          className="mt-[2px] w-6 cursor-pointer text-[#808080] hover:text-black dark:hover:text-white"
          onClick={onAddNote}
        />
      </DialogTrigger>
      <DialogContent className="rounded-lg sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Note</DialogTitle>
          <DialogDescription>
            Once published, it cannot be edited or deleted
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Input
            id="title"
            placeholder="Title"
            className="w-full"
            onChange={onTitleChange}
          />
          <Textarea
            id="content"
            placeholder="Just write something..."
            className="w-full min-h-[120px]"
            onChange={onContentChange}
          />
        </div>
        <DialogFooter className="flex-col space-y-2 sm:space-y-0">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" onClick={onConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddNote;
