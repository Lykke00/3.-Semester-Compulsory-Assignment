import { AllBooksAtom } from "@/atoms/atoms";
import { BookClient, type CreateBookRequest, type GenreDto } from "@/generated-client";
import { finalUrl } from "@/utils/client";
import customCatch from "@/utils/customCatch";
import { useAtom } from "jotai";
import { toast } from "sonner";


const bookApi = new BookClient(finalUrl)

export default function useBooks() {
    const [books, setBooks] = useAtom(AllBooksAtom)

    async function getAllBooks() {
        try {
            const result = await bookApi.all();
            setBooks(result);
        }
        catch (e: any) {
            customCatch(e);
        }
    }

    async function createBook(dto: CreateBookRequest) {
        try {
            const result = await bookApi.create(dto);
            const duplicate = [...books]
            duplicate.push(result);
            setBooks(duplicate);
            toast.success("Book created successfully");
            return result;
        } catch (e: any) {
            customCatch(e);
        }
    }

    return {
        getAllBooks,
        createBook,
        books
    }
}