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
import type { AuthorDto, CreateAuthorRequest, EditAuthorRequest } from "@/generated-client";
import { useEffect } from "react";
import useAuthors from "@/hooks/useAuthors";

interface ModalAuthorNewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  author?: AuthorDto
}

const FormSchema = z.object({
  name: z.string().min(2, "Title must be at least 2 characters"),
});

export default function ModalAuthorNew({ open, onOpenChange, author }: ModalAuthorNewProps) {
    const useAuthorApi = useAuthors();

    useEffect(() => {
        useAuthorApi.getAllAuthors();
    }, [])

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: author?.name ? author.name : '',
        },
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        const edit = author !== undefined;

        if (edit) {
          
            const editGenre: EditAuthorRequest = {
                id: author.id,
                name: data.name
            }

            await useAuthorApi.editAuthor(editGenre);
        } else {
            const genreDto: CreateAuthorRequest = {
                name: data.name
            };

            await useAuthorApi.createAuthor(genreDto);
        }

        onOpenChange(false);
        form.reset();
    };


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-gray-100">{author ? 'Edit author' : 'Add new author'}</DialogTitle>
          <DialogDescription className="text-gray-200">{author ? 'Edit an existing author' : 'Create a new author'}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            {/* Title */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Name</FormLabel>
                  <FormControl>
                    <Input className="text-gray-200 border-zinc-800" {...field} placeholder="Name" />
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
