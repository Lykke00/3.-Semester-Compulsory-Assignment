import type { BookDto } from "@/generated-client";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import ModalBookNew from "../modal/ModalBookNew";

interface BookCardProps {
    book: BookDto
}

export default function BookCard({ book }: BookCardProps) {
    const [showEditModal, setShowEditModal] = useState(false);

    return (
        <>
        <Card className="bg-zinc-900 border border-zinc-800 text-gray-200">
        <CardHeader>
            <CardTitle>{book.title}</CardTitle>
            <CardDescription>{book.genre ? book.genre.name : "No genre.."} </CardDescription>
            <CardAction className="cursor-pointer" onClick={() => setShowEditModal(true)}>
                <EllipsisVertical />
            </CardAction>
        </CardHeader>
        <CardContent>
            <p>Card Content</p>
        </CardContent>
        <CardFooter className="text-xs text-gray-400">
            <p>{book.pages} pages</p>
        </CardFooter>
        </Card>
        <ModalBookNew open={showEditModal} onOpenChange={setShowEditModal} book={book}/>
        </>
    )
}