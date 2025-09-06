"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/layout/card"
import { Badge } from "@/components/ui/data-display/badge"
import type { Pokemon } from "@/types/pokemon"
import { cn } from "@/lib/utils"

interface PokemonCardProps {
  pokemon: Pokemon
  onClick: (pokemon: Pokemon) => void
}

const typeColors: Record<string, string> = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-blue-200",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-green-400",
  rock: "bg-yellow-800",
  ghost: "bg-purple-700",
  dragon: "bg-indigo-700",
  dark: "bg-gray-800",
  steel: "bg-gray-500",
  fairy: "bg-pink-300",
}

function PokemonCardComponent({ pokemon, onClick }: PokemonCardProps) {
  const handleClick = () => {
    onClick(pokemon)
  }

  const formatPokemonId = (id: number) => {
    return id.toString().padStart(3, "0")
  }

  return (
    <Card
      className="cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg bg-card"
      onClick={handleClick}
    >
      <CardContent className="p-4">
        <div className="text-center">
          <div className="relative mb-3">
            <img
              src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-24 h-24 mx-auto object-contain"
              loading="lazy"
            />
          </div>

          <h3 className="font-semibold text-lg capitalize mb-1 text-card-foreground">{pokemon.name}</h3>

          <p className="text-sm text-muted-foreground mb-3">#{formatPokemonId(pokemon.id)}</p>

          <div className="flex flex-wrap gap-1 justify-center">
            {pokemon.types.map((type) => (
              <Badge
                key={type.type.name}
                className={cn("text-white text-xs px-2 py-1", typeColors[type.type.name] || "bg-gray-400")}
              >
                {type.type.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export const PokemonCard = React.memo(PokemonCardComponent)
