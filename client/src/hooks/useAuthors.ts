import { AllAuthorsAtom } from "@/atoms/atoms";
import { AuthorClient, type CreateAuthorRequest, type EditAuthorRequest } from "@/generated-client";
import { finalUrl } from "@/utils/client";
import customCatch from "@/utils/customCatch";
import { useAtom } from "jotai";
import { toast } from "sonner";


const authorApi = new AuthorClient(finalUrl)

export default function useAuthors() {
    const [authors, setAuthors] = useAtom(AllAuthorsAtom)

    async function getAllAuthors() {
        try {
            const result = await authorApi.all();
            setAuthors(result);
            return result;
        }
        catch (e: any) {
            customCatch(e);
        }
    }

    async function createAuthor(dto: CreateAuthorRequest) {
        try {
            const result = await authorApi.create(dto);
            const duplicate = [...authors]
            duplicate.push(result);
            setAuthors(duplicate);
            toast.success("Author created successfully");
            return result;
        } catch (e: any) {
            customCatch(e);
        }
    }

        async function editAuthor(dto: EditAuthorRequest) {
        try {
            const result = await authorApi.update(dto.id, dto)
            const index = authors.findIndex(b => b.id === result.id);
            if (index > -1) {
                const duplicate = [...authors];
                duplicate[index] = result;
                setAuthors(duplicate);
            }
            toast.success("Author updated successfully");
            return result;
        } catch (e: any) {
            customCatch(e);
        }
    }

    async function deleteAuthor(id: string) {
        try {
            const result = await authorApi.delete(id);
            const filtered = authors.filter(b => b.id !== id);
            setAuthors(filtered);
            toast.success("Author deleted successfully");
            return result;
        } catch (e: any) {
            customCatch(e);
        }
    }

    return {
        authors,
        createAuthor,
        deleteAuthor,
        editAuthor,
        getAllAuthors
    }
}