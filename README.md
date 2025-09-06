# Pokédex App

built with Next.js, TypeScript, and shadcn/ui.

## features

-  search Functionality: search by name 
-  responsive Design: optimized for desktop, tablet, and mobile devices
-  pagination: navigate through Pokémon with Previous/Next buttons
-  detailed Modal: click on any Pokémon card to view detailed information including:
  - high-quality Pokemon artwork
  - type indicators with color coding
  - height and weight specifications
  - abilities and special powers
- performance optimized**: built with React.memo and custom hooks for optimal performance

1. **Clone the repository**
   git clone https://github.com/yourusername/pokedex-app.git
   cd pokedex-app


2. **Install dependencies**

   pnpm install

3. **Run the development server**

   pnpm dev

##  API integration

the app integrates with the [PokéAPI](https://pokeapi.co/) to fetch:
- pokemon list with pagination
- individual Pokémon details
- high-quality artwork and sprites
- type information and abilities

### custom Hooks
- `usePokemonApi`: aandles all Pokémon-related API calls
- `useFetchData`: generic hook for data fetching with loading states

##  performance optimizations

- **React.memo**: prevents unnecessary re-renders of Pokémon cards
- **useCallback**: optimizes event handlers and API calls
- **Context Optimization**: state management with useReducer
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting with Next.js App Router

##  acknowledgments

- [PokéAPI](https://pokeapi.co/)
- [shadcn/ui](https://ui.shadcn.com/)

