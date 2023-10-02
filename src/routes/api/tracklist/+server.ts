import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';


export const GET: RequestHandler = async ({ url }) => {
    const id = Number(url.searchParams.get('id') ?? '0');

	if (id === 0) {
		throw error(400, 'No album id provided, unable to fetch tracklist');
	}

    return await fetch('https://jsonplaceholder.typicode.com/albums/'+ id +'/photos');
};