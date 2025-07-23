export async function apiRequest(
  searchString: string,
  pageNumber: number = 0,
): Promise<Response> {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${searchString}?offset=${pageNumber}&limit=40`,
    {
      method: 'GET',
    },
  );
  return response;
}
