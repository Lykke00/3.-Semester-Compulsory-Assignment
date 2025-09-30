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
import type { BookDto, CreateBookRequest, CreateGenreRequest, EditBookRequest, EditGenreRequest, GenreDto } from "@/generated-client";
import useGenres from "@/hooks/useGenres";
import { useEffect } from "react";

interface ModalGenreNewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  genre?: GenreDto
}

const FormSchema = z.object({
  name: z.string().min(2, "Title must be at least 2 characters"),
});

export default function ModalGenreNew({ open, onOpenChange, genre }: ModalGenreNewProps) {
    const useGenresApi = useGenres();

    useEffect(() => {
        useGenresApi.getAllGenres();
    }, [])

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: genre?.name ? genre.name : '',
        },
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        const edit = genre !== undefined;

        if (edit) {
          
            const editGenre: EditGenreRequest = {
                id: genre.id,
                name: data.name
            }

            await useGenresApi.editGenre(editGenre);
        } else {
            const genreDto: CreateGenreRequest = {
                name: data.name
            };

            await useGenresApi.createGenre(genreDto);
        }

        onOpenChange(false);
        form.reset();
    };


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-gray-100">{genre ? 'Edit genre' : 'Add new genre'}</DialogTitle>
          <DialogDescription className="text-gray-200">{genre ? 'Edit an existing genre' : 'Create a new genre'}</DialogDescription>
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
