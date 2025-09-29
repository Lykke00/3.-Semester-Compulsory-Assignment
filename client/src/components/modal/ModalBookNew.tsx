"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useBooks from "@/hooks/useBooks";
import type { BookDto, CreateBookRequest } from "@/generated-client";

interface ModalBookNewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  pages: z.coerce.number()
    .min(1, "Must be at least 1 page")
    .max(5000, "Cannot exceed 5000 pages"),
  genre: z.string().min(1, "Please select a genre"),
});

export default function ModalBookNew({ open, onOpenChange }: ModalBookNewProps) {
    const useBooksApi = useBooks();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      pages: 1,
      genre: "",
    },
  });

const onSubmit = async (data: z.infer<typeof FormSchema>) => {
  const bookDto: CreateBookRequest = {
    title: data.title,
    pages: data.pages,  
    genreId: 1
  };

  await useBooksApi.createBook(bookDto);

  onOpenChange(false);
  form.reset();
};


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-gray-100">Add new book</DialogTitle>
          <DialogDescription className="text-gray-200">Create a new book</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Title</FormLabel>
                  <FormControl>
                    <Input className="text-gray-200 border-zinc-800" {...field} placeholder="Book title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Pages */}
            <FormField
              control={form.control}
              name="pages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Pages</FormLabel>
                  <FormControl>
                    <Input className="text-gray-200 border-zinc-800" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Genre */}
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full border-zinc-800 text-gray-200">
                        <SelectValue placeholder="Select a genre" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800 text-gray-200">
                        <SelectItem value="Fantasy">Fantasy</SelectItem>
                        <SelectItem value="Sci-Fi">Sci-Fi</SelectItem>
                        <SelectItem value="Romance">Romance</SelectItem>
                        <SelectItem value="Mystery">Mystery</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
