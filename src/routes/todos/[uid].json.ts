import type { RequestEvent, RequestHandler } from "@sveltejs/kit";
import { api } from "./_api";

export const del: RequestHandler = (reqEvent: RequestEvent) => {
    return api(reqEvent)
}

export const patch: RequestHandler = async (reqEvent: RequestEvent) => {
    let data = await reqEvent.request.formData();
    const text = data.get('text')?.toString() ?? "";
    console.log({text})
    return api(reqEvent, { text })
}