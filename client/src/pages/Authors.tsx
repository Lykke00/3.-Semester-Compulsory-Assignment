import AuthorCard from "@/components/card/AuthorCard";
import ModalAuthorNew from "@/components/modal/ModalAuthorNew";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useAuthors from "@/hooks/useAuthors";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function AuthorsPage() {
    const [showModal, setShowModal] = useState(false);

    const useAuthorsApi = useAuthors();

    useEffect(() => {
        useAuthorsApi.getAllAuthors();
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
                {useAuthorsApi.authors.map((author, index) => (
                    <AuthorCard key={index} author={author} />
                ))}
            </div>
        </div>
        <ModalAuthorNew open={showModal} onOpenChange={setShowModal} />
        </>

    )
}