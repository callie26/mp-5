"use server";

import getCollection, {URL_COLLECTION} from "@/db";

// function to check if it is valid long url (https://stackoverflow.com/questions/76435352/react-checking-of-a-url-exists)
async function isValidURL(long_url:string){
    try{
        const response = await fetch(long_url, { method: 'HEAD' });
        return response.status === 200;
    } catch{
        return false;
    }
}

export default async function checkDB(url:string, alias:string) {
    const urlCollection = await getCollection(URL_COLLECTION);

    // check if url is valid, if not throw an error
    if (!await isValidURL(url)) {
        return {
            success: false,
            error: "Invalid URL",
        };
    }

    // check if alias already exists
    const alias_url = await urlCollection.findOne({alias:alias});

    // if exists then return true
    if (alias_url) {
        return (
            {success: false, error: "Alias already exists"}
        )
    }

    // else add to collection and return false
    const add_alias = {
        long_url: url,
        alias: alias,
    }
    await urlCollection.insertOne(add_alias);

    return (
        {success: true, error: ""}
    )
}