"use client"

import { useCallback } from "react"
import { usePokemon } from "@/contexts/PokemonContext"
import type { Pokemon, PokemonListResponse } from "@/types/pokemon"

const POKEMON_API_BASE = "https://pokeapi.co/api/v2"
const POKEMON_PER_PAGE = 20

export function usePokemonApi() {
  const { dispatch } = usePokemon()

  const fetchPokemonList = useCallback(
    async (page = 1) => {
      dispatch({ type: "SET_LOADING", payload: true })
      dispatch({ type: "SET_ERROR", payload: null })

      try {
        const offset = (page - 1) * POKEMON_PER_PAGE
        const response = await fetch(`${POKEMON_API_BASE}/pokemon?limit=${POKEMON_PER_PAGE}&offset=${offset}`)

        if (!response.ok) {
          throw new Error("Failed to fetch Pokemon list")
        }

        const data: PokemonListResponse = await response.json()

        // Fetch detailed data for each Pokemon
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const detailResponse = await fetch(pokemon.url)
            if (!detailResponse.ok) {
              throw new Error(`Failed to fetch details for ${pokemon.name}`)
            }
            return detailResponse.json()
          }),
        )

        dispatch({ type: "SET_POKEMON_LIST", payload: pokemonDetails })
        dispatch({ type: "SET_CURRENT_PAGE", payload: page })
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: error instanceof Error ? error.message : "An error occurred",
        })
      }
    },
    [dispatch],
  )

  const fetchPokemonDetails = useCallback(
    async (pokemonId: number) => {
      try {
        const response = await fetch(`${POKEMON_API_BASE}/pokemon/${pokemonId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch Pokemon details")
        }
        const pokemon: Pokemon = await response.json()
        dispatch({ type: "SET_SELECTED_POKEMON", payload: pokemon })
        return pokemon
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: error instanceof Error ? error.message : "Failed to fetch Pokemon details",
        })
        return null
      }
    },
    [dispatch],
  )

  const setSearchTerm = useCallback(
    (term: string) => {
      dispatch({ type: "SET_SEARCH_TERM", payload: term })
    },
    [dispatch],
  )

  const clearSelectedPokemon = useCallback(() => {
    dispatch({ type: "SET_SELECTED_POKEMON", payload: null })
  }, [dispatch])

  return {
    fetchPokemonList,
    fetchPokemonDetails,
    setSearchTerm,
    clearSelectedPokemon,
  }
}
