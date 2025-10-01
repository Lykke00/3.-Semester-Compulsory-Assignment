import type { AuthorDto } from "@/generated-client";
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuShortcut, DropdownMenuTrigger } from "../ui/dropdown-menu";
import useGenres from "@/hooks/useGenres";
import ModalAuthorNew from "../modal/ModalAuthorNew";

interface AuthorCardProps {
    author: AuthorDto
}

export default function AuthorCard({ author }: AuthorCardProps) {
    const [showEditModal, setShowEditModal] = useState(false);
    const useGenresApi = useGenres();

    return (
        <>
        <Card className="bg-zinc-900 border border-zinc-800 text-gray-200">
        <CardHeader>
            <CardTitle>{author.name}</CardTitle>
            <CardAction className="cursor-pointer">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <EllipsisVertical/>

                        </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 bg-zinc-900 border border-zinc-800 text-gray-200" align="start">
                                <DropdownMenuLabel>Edit Author</DropdownMenuLabel>
                                <DropdownMenuGroup>
                                <DropdownMenuItem onClick={() => setShowEditModal(true)}>
                                    Update
                                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => useGenresApi.deleteGenre(author.id)}>
                                    Delete
                                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>

                    </DropdownMenu>
            </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col">
            <p className="text-gray-200">Books</p>
            {author.books?.map((book, index) => (
                <p key={index} className="text-sm text-gray-400">{book.title}</p>
            ))}
        </CardContent>
        <CardFooter className="text-xs text-gray-400">
            <p>{new Date(author.createdAt).toLocaleString()}</p>
        </CardFooter>
        </Card>
        <ModalAuthorNew open={showEditModal} onOpenChange={setShowEditModal} author={author} />
        </>
    )
}