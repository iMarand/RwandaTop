// src/routes/api/football-news/+server.js
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    const url = 'https://free-football-api-data.p.rapidapi.com/football-all-countries';
    const options = {
        method: 'GET',
        url: 'https://free-football-api-data.p.rapidapi.com/football-all-countries',
        headers: {
          'x-rapidapi-key': 'a7d709ae68mshc013cd63d556bb0p1fb9eejsn6261156f6655',
          'x-rapidapi-host': 'free-football-api-data.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Return the result as JSON
        return json(result);
    } catch (error) {
        console.error('Error fetching football news:', error);
        return json({ error: 'Failed to fetch football news' }, { status: 500 });
    }
}