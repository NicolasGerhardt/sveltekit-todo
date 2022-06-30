/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	type Todo = {
		uid: string
		created_at: Date,
		text: string,
		done: boolean
	}
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

