import { AllBooksAtom } from "@/atoms/atoms";
import { BookClient, type CreateBookRequest, type EditBookRequest, type GenreDto, type UpdateBookAuthorsRequest } from "@/generated-client";
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

        async function editBook(dto: EditBookRequest) {
        try {
            const result = await bookApi.update(dto.id, dto)
            const index = books.findIndex(b => b.id === result.id);
            if (index > -1) {
                const duplicate = [...books];
                duplicate[index] = result;
                setBooks(duplicate);
            }

            /*
            result.authorsIds.forEach(authorId => {
                const authorIndex = authors.findIndex(a => a.id === authorId);
                if (authorIndex > -1) {
                    const authorDuplicate = [...authors];
                    if (!authorDuplicate[authorIndex].bookIds.includes(result.id!)) {
                        authorDuplicate[authorIndex].bookIds.push(result.id!);
                        setAuthors(authorDuplicate);
                    }
                }
            })
            const genre = genres.findIndex(g => g.id == result.genreId)
            if (genre > -1) {
                const genreDuplicate = [...genres];
                if (!genreDuplicate[genre].books.includes(result.id!)) {
                    genreDuplicate[genre].books.push(result.id!);
                    setGenres(genreDuplicate);
                }
            }*/
            toast.success("Book updated successfully");
            return result;
        } catch (e: any) {
            customCatch(e);
            
        }
    }

    async function editBookAuthors(dto: UpdateBookAuthorsRequest) {
        try {
            const result = await bookApi.updateAuthors(dto)
            const index = books.findIndex(b => b.id === result.id);
            if (index > -1) {
                const duplicate = [...books];
                duplicate[index] = result;
                setBooks(duplicate);
            }

            toast.success("Authors updated successfully");
            return result;
        } catch (e: any) {
            customCatch(e);
            
        }
    }


    async function deleteBook(id: string) {
        try {
            const result = await bookApi.delete(id);
            const filtered = books.filter(b => b.id !== id);
            setBooks(filtered);
            toast.success("Book deleted successfully");
            return result;
        } catch (e: any) {
            customCatch(e);
        }
    }


    return {
        getAllBooks,
        createBook,
        editBook,
        deleteBook,
        editBookAuthors,
        books
    }
}