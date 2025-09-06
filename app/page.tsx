"use client"

import { useEffect } from "react"
import { PokemonProvider, usePokemon } from "@/contexts/PokemonContext"
import { usePokemonApi } from "@/hooks/usePokemonApi"
import { PokemonCard } from "@/components/features/pokemon/PokemonCard"
import { PokemonModal } from "@/components/features/pokemon/PokemonModal"
import { SearchBar } from "@/components/features/pokemon/SearchBar"
import { Pagination } from "@/components/Pagination"
import { LoadingSpinner } from "@/components/shared/LoadingSpinner"
import { Alert, AlertDescription } from "@/components/ui/feedback/alert"
import type { Pokemon } from "@/types/pokemon"

function PokemonGrid() {
  const { state } = usePokemon()
  const { fetchPokemonList, fetchPokemonDetails, setSearchTerm, clearSelectedPokemon } = usePokemonApi()

  useEffect(() => {
    fetchPokemonList(1)
  }, [fetchPokemonList])

  const handlePokemonClick = (pokemon: Pokemon) => {
    fetchPokemonDetails(pokemon.id)
  }

  const handlePreviousPage = () => {
    if (state.currentPage > 1) {
      fetchPokemonList(state.currentPage - 1)
    }
  }

  const handleNextPage = () => {
    fetchPokemonList(state.currentPage + 1)
  }

  const handleSearchChange = (term: string) => {
    setSearchTerm(term)
  }

  if (state.error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert className="max-w-md mx-auto">
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Pokédex</h1>
          <SearchBar value={state.searchTerm} onChange={handleSearchChange} placeholder="Search Pokémon..." />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {state.isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            {/* Pokemon Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
              {state.filteredPokemon.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} onClick={handlePokemonClick} />
              ))}
            </div>

            {/* Show message if no Pokemon found */}
            {state.filteredPokemon.length === 0 && !state.isLoading && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No Pokémon found matching "{state.searchTerm}"</p>
              </div>
            )}

            {/* Pagination - only show when not searching */}
            {!state.searchTerm && (
              <Pagination
                currentPage={state.currentPage}
                onPrevious={handlePreviousPage}
                onNext={handleNextPage}
                hasPrevious={state.currentPage > 1}
                hasNext={state.pokemonList.length === 20} // Assuming full page means more data available
              />
            )}
          </>
        )}
      </main>

      {/* Pokemon Details Modal */}
      <PokemonModal pokemon={state.selectedPokemon} isOpen={!!state.selectedPokemon} onClose={clearSelectedPokemon} />
    </div>
  )
}

export default function Home() {
  return (
    <PokemonProvider>
      <PokemonGrid />
    </PokemonProvider>
  )
}
