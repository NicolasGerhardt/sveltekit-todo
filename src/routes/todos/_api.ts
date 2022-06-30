import type { RequestEvent, RequestHandler, ResponseBody } from "@sveltejs/kit";
import { append } from "svelte/internal";

// TODO: Persist in database
let todos: (App.Todo)[] = [
    {
        uid: `${Date.now() - 2 }`, //TODO replace with UID from database
        created_at: new Date(),
        text: "First",
        done: false
    },
    {
        uid: `${Date.now() - 1 }`, //TODO replace with UID from database
        created_at: new Date(),
        text: "Second",
        done: true
    },
];

export const api = (reqEvent: RequestEvent, data?: App.Todo | Record<string, string | boolean | undefined>) => {
    let body = {};
    let status = 500;
    let headers = {
        location: "/"
    }

    switch (reqEvent.request.method.toUpperCase()) {
        case "GET":
            body = todos
            status = 200;
            break;
        case "POST":
            if (data) {
                todos.push(data as App.Todo)
                status = 302
            }
            break;
        case "DELETE":
            console.log("deleted")
            todos = todos.filter(todo => todo.uid !== reqEvent.params.uid)
            status = 302
            break;
        case "PATCH":
            todos = todos.map(todo => {
                if (todo.uid === reqEvent.params.uid) {
                    if (data?.text) todo.text = data?.text as string
                    else todo.done = data?.done as boolean
                }
                return todo;
            })
            status = 302
            body = todos
            break;
        default:
            break;
    }

    console.log({todos})

    return { status, body, headers };
}