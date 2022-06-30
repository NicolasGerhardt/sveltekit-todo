import type { RequestEvent, RequestHandler } from "@sveltejs/kit";
import { api } from "./_api"

export const get: RequestHandler = (reqEvent: RequestEvent) => {
    return api(reqEvent)
}

export const post: RequestHandler = async (reqEvent: RequestEvent) => {
    let data = await reqEvent.request.formData();
    
    const todoItem = {
        uid: `${Date.now()}`, //TODO replace with UID from database
        created_at: new Date(),
        text: data.get('text')?.toString() ?? "",
        done: false
    }

    return api(reqEvent, todoItem)
}