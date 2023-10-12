import { firstGame, secondGame } from "./formatter";

export const compareNumbers = (dezenas: string[]) => {
  const commonNumbersGame1 = dezenas.filter((number) => firstGame.includes(number));
  const commonNumbersGame2 = dezenas.filter((number) => secondGame.includes(number));

  return {
    game1: commonNumbersGame1,
    game2: commonNumbersGame2,
  }
};