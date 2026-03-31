import { create } from "zustand";
import type { Game } from "@/types/game";

interface GamesState {
  games: Game[];
  favorites: string[];
  setGames: (games: Game[]) => void;
  toggleFavorite: (gameId: string) => void;
  setFavorites: (ids: string[]) => void;
}

export const useGamesStore = create<GamesState>((set) => ({
  games: [],
  favorites: [],

  setGames: (games) => set({ games }),

  toggleFavorite: (gameId) =>
    set((state) => {
      const isFavorite = state.favorites.includes(gameId);
      const newFavorites = isFavorite
        ? state.favorites.filter((id) => id !== gameId)
        : [...state.favorites, gameId];
      return {
        favorites: newFavorites,
        games: state.games.map((g) =>
          g.id === gameId ? { ...g, isFavorite: !isFavorite } : g
        ),
      };
    }),

  setFavorites: (ids) => set({ favorites: ids }),
}));
