import { useState } from 'react';
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  title: z.string().refine((v) => !!v, 'Title is required'),
  content: z.string().refine((v) => !!v, 'Content is required'),
});

function AddNote() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { addNoteTrigger, mutate } = useNotes();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { title, content } = values;
    addNoteTrigger({ title, content, x: 0, y: 0 }).then(
      () => {
        mutate();
        setOpen(false);
        form.reset();
        toast({ description: 'Have a good day ☀️' });
      },
      () => {
        toast({
          variant: 'destructive',
          title: 'Ooops!',
          description: 'Please try again',
        });
      }
    );
  };

  const onCancel = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-6 px-2 pl-1.5">
          <Plus className="mr-0.5 w-4" />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-lg sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Note</DialogTitle>
          <DialogDescription>
            Once published, it cannot be edited or deleted
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Just write something..."
                      className="min-h-[120px] w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex-col space-y-2 sm:space-y-0">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">Confirm</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddNote;
