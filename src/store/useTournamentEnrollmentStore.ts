import { create } from "zustand";

/** Inscrições mock (cliente). Backend futuro substituirá por API. */
interface TournamentEnrollmentState {
  enrolledSlugs: Record<string, true>;
  enroll: (slug: string) => void;
}

export const useTournamentEnrollmentStore = create<TournamentEnrollmentState>((set) => ({
  enrolledSlugs: {},
  enroll: (slug) =>
    set((state) => ({
      enrolledSlugs: { ...state.enrolledSlugs, [slug]: true },
    })),
}));
