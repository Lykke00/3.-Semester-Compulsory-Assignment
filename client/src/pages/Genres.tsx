import GenreCard from "@/components/card/GenreCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
                {useGenresApi.genres.map((genre, index) => (
                    <GenreCard key={index} genre={genre} />
                ))}
            </div>
        </div>
        </>

    )
}