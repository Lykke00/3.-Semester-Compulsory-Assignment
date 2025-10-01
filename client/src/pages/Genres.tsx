import GenreCard from "@/components/card/GenreCard";
import ModalGenreNew from "@/components/modal/ModalGenreNew";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useGenres from "@/hooks/useGenres";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function GenresPage() {
    const [showModal, setShowModal] = useState(false);
    const useGenresApi = useGenres();

    useEffect(() => {
        useGenresApi.getAllGenres();
    }, [])

    return (
        <>
        <div className="flex flex-col gap-4">
            <div className="flex justify-between">
                <div/>
                <Button className="cursor-pointer" size='icon' onClick={() => setShowModal(true)}>
                    <PlusIcon />
                </Button>
            </div>
            <Separator className="bg-zinc-800" orientation="horizontal" />
            <div className="grid grid-cols-3 gap-4">
                {useGenresApi.genres.map((genre, index) => (
                    <GenreCard key={index} genre={genre} />
                ))}
            </div>
        </div>
        <ModalGenreNew open={showModal} onOpenChange={setShowModal} />
        </>

    )
}