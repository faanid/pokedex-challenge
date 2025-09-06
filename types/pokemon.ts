export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListItem[]
}

export interface PokemonListItem {
  name: string
  url: string
}

export interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  base_experience: number
  sprites: {
    front_default: string
    other: {
      "official-artwork": {
        front_default: string
      }
    }
  }
  types: PokemonType[]
  abilities: PokemonAbility[]
  stats: PokemonStat[]
}

export interface PokemonType {
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface PokemonAbility {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  slot: number
}

export interface PokemonStat {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

export interface PokemonContextState {
  pokemonList: Pokemon[]
  filteredPokemon: Pokemon[]
  currentPage: number
  totalPages: number
  isLoading: boolean
  error: string | null
  searchTerm: string
  selectedPokemon: Pokemon | null
}

export type PokemonAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_POKEMON_LIST"; payload: Pokemon[] }
  | { type: "SET_CURRENT_PAGE"; payload: number }
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "SET_SELECTED_POKEMON"; payload: Pokemon | null }
  | { type: "FILTER_POKEMON" }
