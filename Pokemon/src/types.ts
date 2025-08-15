export interface Pokemon {
  id: number;
  name: string;
  sprites: Other;
  stats: Stat[];
  results: Results[];
}

interface Other {
  other: DreamWorld;
}

interface DreamWorld {
  dream_world: {
    front_default: string;
  };
}

interface Stat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface List {
  results: Results[];
  name: string;
}

export interface Results {
  name: string;
  url: string;
}

export interface ParamsQuery {
  name: string | undefined;
  pageNumber: number | undefined;
}

export interface CurrentSearchParams {
  page?: string;
  card?: string;
  details?: string;
}
