"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { PokemonContextState, PokemonAction } from "@/types/pokemon"

const initialState: PokemonContextState = {
  pokemonList: [],
  filteredPokemon: [],
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  error: null,
  searchTerm: "",
  selectedPokemon: null,
}

function pokemonReducer(state: PokemonContextState, action: PokemonAction): PokemonContextState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload }
    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false }
    case "SET_POKEMON_LIST":
      return {
        ...state,
        pokemonList: action.payload,
        filteredPokemon: action.payload,
        isLoading: false,
      }
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload }
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload }
    case "SET_SELECTED_POKEMON":
      return { ...state, selectedPokemon: action.payload }
    case "FILTER_POKEMON":
      const filtered = state.searchTerm
        ? state.pokemonList.filter((pokemon) => pokemon.name.toLowerCase().includes(state.searchTerm.toLowerCase()))
        : state.pokemonList
      return { ...state, filteredPokemon: filtered }
    default:
      return state
  }
}

const PokemonContext = createContext<{
  state: PokemonContextState
  dispatch: React.Dispatch<PokemonAction>
} | null>(null)

export function PokemonProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(pokemonReducer, initialState)

  // Filter Pokemon whenever search term changes
  useEffect(() => {
    dispatch({ type: "FILTER_POKEMON" })
  }, [state.searchTerm, state.pokemonList])

  return <PokemonContext.Provider value={{ state, dispatch }}>{children}</PokemonContext.Provider>
}

export function usePokemon() {
  const context = useContext(PokemonContext)
  if (!context) {
    throw new Error("usePokemon must be used within a PokemonProvider")
  }
  return context
}
