export async function apiRequest(searchString: string): Promise<Response> {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${searchString}?limit=40`,
    {
      method: 'GET',
    },
  );
  return response;
}
