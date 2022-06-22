import type { RequestHandler } from "@sveltejs/kit";

// TODO: Persist in database
let todos: (Todo)[] = [
    {
        created_at: new Date(),
        text: "First",
        done: false
    },
    {
        created_at: new Date(),
        text: "Second",
        done: true
    },
];

export const get: RequestHandler = () => {
    return {
        status: 200,
        body: todos
    }
}

export const post: RequestHandler = async ({request}) => {
    let data = await request.formData();
    
    todos.push({
        created_at: new Date(),
        text: data.get('text')?.toString() ?? "",
        done: false
    })
    
    console.log(todos)

    return {
        status: 303,
        headers: {
            location: "/"
        }
    }
}