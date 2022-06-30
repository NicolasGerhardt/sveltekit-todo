import type { RequestEvent, RequestHandler, ResponseBody } from "@sveltejs/kit";

// TODO: Persist in database
let todos: (Todo)[] = [
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

export const api = (reqEvent: RequestEvent, todoItem?: Todo) => {
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
            if (todoItem) {
                todos.push(todoItem)
                status = 303
            }
            break;
        case "DELETE":
            console.log("deleted")
            todos = todos.filter(todo => todo.uid !== reqEvent.params.uid)
            status = 303
            break;
        default:
            break;
    }

    console.log({todos})

    return { status, body, headers };
}