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
