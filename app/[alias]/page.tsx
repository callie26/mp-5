import { redirect } from "next/navigation";
import getCollection, {URL_COLLECTION} from "@/db";

export default async function RedirectPage({ params }: { params: Promise<{alias:string}> }) {
    const {alias} = await params;
    console.log(alias);

    const urlCollection = await getCollection(URL_COLLECTION);
    const url = await urlCollection.findOne({alias:alias});

    if (!url) {
        return redirect(`/error`);
    }
    redirect(url.long_url);
}