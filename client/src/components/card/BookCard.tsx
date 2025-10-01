import type { BookDto } from "@/generated-client";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import ModalBookNew from "../modal/ModalBookNew";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuShortcut, DropdownMenuTrigger } from "../ui/dropdown-menu";
import useBooks from "@/hooks/useBooks";

interface BookCardProps {
    book: BookDto
}

export default function BookCard({ book }: BookCardProps) {
    const [showEditModal, setShowEditModal] = useState(false);
    const useBooksApi = useBooks();

    return (
        <>
        <Card className="bg-zinc-900 border border-zinc-800 text-gray-200">
        <CardHeader>
            <CardTitle>{book.title}</CardTitle>
            <CardDescription>{book.genre ? book.genre.name : "No genre.."} </CardDescription>
            <CardAction className="cursor-pointer">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <EllipsisVertical/>

                        </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 bg-zinc-900 border border-zinc-800 text-gray-200" align="start">
                                <DropdownMenuLabel>Edit book</DropdownMenuLabel>
                                <DropdownMenuGroup>
                                <DropdownMenuItem onClick={() => setShowEditModal(true)}>
                                    Update
                                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => useBooksApi.deleteBook(book.id)}>
                                    Delete
                                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>

                    </DropdownMenu>
            </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col">
            <p className="text-gray-200">Authors</p>
            {book.authors?.map((author, index) => (
                <p key={index} className="text-sm text-gray-400">{author.name}</p>
            ))}
        </CardContent>
        <CardFooter className="text-xs text-gray-400">
            <p>{book.pages} pages</p>
        </CardFooter>
        </Card>
        <ModalBookNew open={showEditModal} onOpenChange={setShowEditModal} book={book}/>
        </>
    )
}