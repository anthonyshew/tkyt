import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { publicProcedure, router } from '~/server/trpc';

const templateOptions = [
  "Hi, my name is {name} and I have {amount} {noun}. ",
  "I, {name}, can count to {amount}, especially if I'm counting in units of {noun}.",
  "{noun} is something that {name} loves so much that they have {amount} of them.",
  "{name} is the owner of {amount} {noun}s.",
]


export const appRouter = router({
  countTemplates: publicProcedure.query(() => {
    return templateOptions.length
  }),
  madLibBuilder: publicProcedure
    .input(
      z.object({
        name: z.string().nullable(),
        noun: z.string(),
        amount: z.number()
      }),
    )
    .mutation(({ input }) => {
      const randomIndex = Math.floor(Math.random() * ((templateOptions.length - 1) - 0))

      const madLib = templateOptions[randomIndex]

      if (!input.name) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Hey! I need a name to work with!"
        })
      }

      const replaceName = madLib
        .replace("{name}", input.name)
        .replace("{noun}", input.noun)
        .replace("{amount}", String(input.amount))

      return replaceName;
    }),
});

export type AppRouter = typeof appRouter;
