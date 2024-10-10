
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
    console.log(url);

    return json(url);
}