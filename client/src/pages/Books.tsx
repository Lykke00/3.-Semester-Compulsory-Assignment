import BookCard from "@/components/card/BookCard";
import useBooks from "@/hooks/useBooks"
import { useEffect } from "react";

export default function BooksPage() {
    const useBooksApi = useBooks();

    useEffect(() => {
        useBooksApi.getAllBooks()
        console.log("hello")
    }, [])

    return (
        <div>
            <div className="grid grid-cols-3 gap-4">
                {useBooksApi.books.map((book, index) => (
                    <BookCard key={index} book={book} />
                ))}
            </div>
        </div>
    )
}