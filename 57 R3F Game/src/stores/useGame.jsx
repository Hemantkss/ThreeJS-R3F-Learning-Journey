import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export default create(
  subscribeWithSelector((set) => {
    return {
      blocksCounts: 10,
      bloackSeed: 0,

      /**
       * Time
       */
      startTime: 0,
      endTime: 0,

      /**
       * Phases
       */
      phase: "ready",
      // Start
      start: () => {
        set((state) => {
          if (state.phase === "ready") 
            return { phase: "playing", startTime: Date.now() };

          return {};
        });
      },

      // Restart
      restart: () => {
        set((state) => {
          if (state.phase === "playing" || state.phase === "ended")
            return { phase: "ready", bloackSeed: Math.random() };

          return {};
        });
      },

      // Ended
      end: () => {
        set((state) => {
          if (state.phase === "playing") 
            return { phase: "ended", endTime: Date.now() };

          return {};
        });
      },
    };
  })
);
