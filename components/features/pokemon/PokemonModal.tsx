"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/feedback/dialog"
import { Badge } from "@/components/ui/data-display/badge"
import type { Pokemon } from "@/types/pokemon"
import { cn } from "@/lib/utils"

interface PokemonModalProps {
  pokemon: Pokemon | null
  isOpen: boolean
  onClose: () => void
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

export function PokemonModal({ pokemon, isOpen, onClose }: PokemonModalProps) {
  if (!pokemon) return null

  const formatPokemonId = (id: number) => {
    return id.toString().padStart(3, "0")
  }

  const formatHeight = (height: number) => {
    return (height / 10).toFixed(1) + " m"
  }

  const formatWeight = (weight: number) => {
    return (weight / 10).toFixed(1) + " kg"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold capitalize">
            {pokemon.name} #{formatPokemonId(pokemon.id)}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <img
              src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-48 h-48 mx-auto object-contain"
            />
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-foreground">Type</h4>
            <div className="flex gap-2">
              {pokemon.types.map((type) => (
                <Badge
                  key={type.type.name}
                  className={cn("text-white px-3 py-1", typeColors[type.type.name] || "bg-gray-400")}
                >
                  {type.type.name}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-foreground">Height</h4>
              <p className="text-lg">{formatHeight(pokemon.height)}</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Weight</h4>
              <p className="text-lg">{formatWeight(pokemon.weight)}</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-foreground">Abilities</h4>
            <div className="space-y-1">
              {pokemon.abilities.slice(0, 3).map((ability) => (
                <div key={ability.ability.name} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="capitalize">{ability.ability.name.replace("-", " ")}</span>
                  {ability.is_hidden && (
                    <Badge variant="outline" className="text-xs">
                      Hidden
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
