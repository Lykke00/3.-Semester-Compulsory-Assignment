import { ApiException } from "@/generated-client";
import { toast } from "sonner";

export interface ProblemDetails {
    title: string
}

export default function customCatch(e: any) {
    if (e instanceof ApiException) {
        const problemDetails = JSON.parse(e.response) as ProblemDetails;
        toast(problemDetails.title)
    }
    else if (e instanceof TypeError) {
        toast("Could not connect to API. Please check your connection.");
    } 
}