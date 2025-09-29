import { AllBooksAtom } from "@/atoms/atoms";
import { BookClient } from "@/generated-client";
import { finalUrl } from "@/utils/client";
import { useAtom } from "jotai";


const bookApi = new BookClient(finalUrl)

export default function useBooks() {
    const [books, setBooks] = useAtom(AllBooksAtom)

    async function getAllBooks() {
        try {
            const result = await bookApi.all();
            setBooks(result);
        }
        catch (e: any) {
            console.log("hello")
        }
    }

    return {
        getAllBooks,
        books
    }
}