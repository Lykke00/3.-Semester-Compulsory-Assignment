import { AllBooksAtom, AllGenresAtom } from "@/atoms/atoms";
import { BookClient, GenreClient, type CreateBookRequest, type CreateGenreRequest, type EditBookRequest, type EditGenreRequest, type GenreDto } from "@/generated-client";
import { finalUrl } from "@/utils/client";
import customCatch from "@/utils/customCatch";
import { useAtom } from "jotai";
import { toast } from "sonner";


const genreApi = new GenreClient(finalUrl)

export default function useGenres() {
    const [genres, setGenres] = useAtom(AllGenresAtom)

    async function getAllGenres() {
        try {
            const result = await genreApi.all();
            setGenres(result);
        }
        catch (e: any) {
            customCatch(e);
        }
    }

    async function createGenre(dto: CreateGenreRequest) {
        try {
            const result = await genreApi.create(dto);
            const duplicate = [...genres]
            duplicate.push(result);
            setGenres(duplicate);
            toast.success("Genre created successfully");
            return result;
        } catch (e: any) {
            customCatch(e);
        }
    }

        async function editGenre(dto: EditGenreRequest) {
        try {
            const result = await genreApi.update(dto.id, dto)
            const index = genres.findIndex(b => b.id === result.id);
            if (index > -1) {
                const duplicate = [...genres];
                duplicate[index] = result;
                setGenres(duplicate);
            }
            toast.success("Genre updated successfully");
            return result;
        } catch (e: any) {
            customCatch(e);
        }
    }

    async function deleteGenre(id: string) {
        try {
            const result = await genreApi.delete(id);
            const filtered = genres.filter(b => b.id !== id);
            setGenres(filtered);
            toast.success("Genre deleted successfully");
            return result;
        } catch (e: any) {
            customCatch(e);
        }
    }

    return {
        getAllGenres,
        createGenre,
        editGenre,
        deleteGenre,
        genres,
    }
}