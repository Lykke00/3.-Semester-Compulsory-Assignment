import type { GenreDto } from "@/generated-client";
import { Card, CardAction, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuShortcut, DropdownMenuTrigger } from "../ui/dropdown-menu";
import useGenres from "@/hooks/useGenres";
import ModalGenreNew from "../modal/ModalGenreNew";

interface GenreCardProps {
    genre: GenreDto
}

export default function GenreCard({ genre }: GenreCardProps) {
    const [showEditModal, setShowEditModal] = useState(false);
    const useGenresApi = useGenres();

    return (
        <>
        <Card className="bg-zinc-900 border border-zinc-800 text-gray-200">
        <CardHeader>
            <CardTitle>{genre.name}</CardTitle>
            <CardAction className="cursor-pointer">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <EllipsisVertical/>

                        </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 bg-zinc-900 border border-zinc-800 text-gray-200" align="start">
                                <DropdownMenuLabel>Edit Genre</DropdownMenuLabel>
                                <DropdownMenuGroup>
                                <DropdownMenuItem onClick={() => setShowEditModal(true)}>
                                    Update
                                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => useGenresApi.deleteGenre(genre.id)}>
                                    Delete
                                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>

                    </DropdownMenu>
            </CardAction>
        </CardHeader>
        <CardFooter className="text-xs text-gray-400">
            <p>{new Date(genre.createdAt).toLocaleString()}</p>
        </CardFooter>
        </Card>
        <ModalGenreNew open={showEditModal} onOpenChange={setShowEditModal} genre={genre} />
        </>
    )
}