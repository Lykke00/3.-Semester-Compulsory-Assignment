"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import type { BookDto, CreateBookRequest, EditBookRequest } from "@/generated-client";
import useGenres from "@/hooks/useGenres";
import { useEffect, useState } from "react";
import { MultiSelect } from "../ui/multi-select";

interface ModalBookNewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  book?: BookDto
}

const FormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  pages: z.coerce.number()
    .min(1, "Must be at least 1 page")
    .max(5000, "Cannot exceed 5000 pages"),
  genre: z.string().min(1, "Please select a genre"),
});

const options = [
	{ value: "next", label: "Next.js" },
	{ value: "react", label: "React" },
	{ value: "typescript", label: "TypeScript" },
];


export default function ModalBookNew({ open, onOpenChange, book }: ModalBookNewProps) {
    const [selected, setSelected] = useState<string[]>([]);

    const useBooksApi = useBooks();
    const useGenresApi = useGenres();

    useEffect(() => {
        useGenresApi.getAllGenres();
    }, [])

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: book?.title ? book.title : '',
            pages: book?.pages ? book.pages : 1,
            genre: book?.genre ? book.genre.id : '',
        },
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        const edit = book !== undefined;

        if (edit) {
            const editedBook: EditBookRequest = {
                id: book.id,
                title: data.title,
                pages: data.pages,
                genreId: data.genre
            }

            await useBooksApi.editBook(editedBook);
        } else {
            const bookDto: CreateBookRequest = {
                title: data.title,
                pages: data.pages,  
                genreId: 1
            };

            await useBooksApi.createBook(bookDto);
        }

        onOpenChange(false);
        form.reset();
    };


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-gray-100">{book ? 'Edit book' : 'Add new book'}</DialogTitle>
          <DialogDescription className="text-gray-200">{book ? 'Edit an existing book' : 'Create a new book'}</DialogDescription>
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
                  <FormLabel className="text-gray-200">Genre</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full border-zinc-800 text-gray-200">
                        <SelectValue placeholder="Select a genre" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800 text-gray-200">
                        {useGenresApi.genres.map((genre, index) => (
                            <SelectItem key={index} value={genre.id}>{genre.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Authors */}
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Authors</FormLabel>
                  <FormControl>
                    <MultiSelect
                        options={options}
                        onValueChange={setSelected}
                        responsive={true}
                        minWidth="200px"
                        maxWidth="400px"
                        placeholder="Search..."
                    />

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
