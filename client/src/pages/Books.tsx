import BookCard from "@/components/card/BookCard";
import ModalBookNew from "@/components/modal/ModalBookNew";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useBooks from "@/hooks/useBooks"
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function BooksPage() {
    const [showModal, setShowModal] = useState(false);
    const useBooksApi = useBooks();

    useEffect(() => {
        useBooksApi.getAllBooks()
    }, [])

    return (
        <>
        <div className="flex flex-col gap-4">
            <div className="flex justify-between">
                <Input 
                    className="w-auto bg-zinc-900 border-zinc-800 text-gray-200"
                    placeholder="Search..."
                    />
                <Button className="cursor-pointer" size='icon' onClick={() => setShowModal(true)}>
                    <PlusIcon />
                </Button>
            </div>
            <Separator className="bg-zinc-800" orientation="horizontal" />
            <div className="grid grid-cols-3 gap-4">
                {useBooksApi.books.map((book, index) => (
                    <BookCard key={index} book={book} />
                ))}
            </div>
        </div>
        <ModalBookNew open={showModal} onOpenChange={setShowModal} />
        </>
    )
}