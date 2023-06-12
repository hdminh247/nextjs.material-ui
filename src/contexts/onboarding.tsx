// External
import React, { createContext, useContext } from "react";

import { User } from "./auth";

// Contexts
import { useAuth } from "./auth";
// @ts-ignore
const context = createContext<Context>({});

// Expose this role in this onboarding context
export { Role } from "../constants";

import { Role } from "../constants";

export function OnboardingContext({ children }: Props) {
  const { user } = useAuth();

  // calculate the percentage of profile completion.
  function calculateCompletion(): number {
    if (user) {
      const { role, artist, studio } = user as User;
      let result;
      switch (role) {
        case Role.ARTIST: {
          if (!artist) result = 0;
          else
            result = Math.floor(
              (Object.keys(artist.onboarding_steps).filter((k) => artist.onboarding_steps[k]).length * 100) /
                Object.keys(artist.onboarding_steps).length,
            );
          return result;
        }
        case Role.STUDIO: {
          if (!studio) result = 0;
          else
            result = Math.floor(
              (Object.keys(studio.onboarding_steps).filter((k) => studio.onboarding_steps[k]).length * 100) /
                Object.keys(studio.onboarding_steps).length,
            );
          return result;
        }
        default: {
          return 0;
        }
      }
    } else {
      return 0;
    }
  }

  return (
    <context.Provider
      value={{
        calculateCompletion,
      }}
    >
      {children}
    </context.Provider>
  );
}

export function useOnboarding() {
  return useContext(context);
}

interface Props {
  children: JSX.Element;
}

interface Context {
  calculateCompletion: () => number;
}
