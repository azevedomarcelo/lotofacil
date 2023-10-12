import { useCallback, useState } from "react";
import { Spinner } from "../Spinner";

import styles from './styles.module.css';

export function GenerateNumbers() {
  const [isLoading, setIsLoading] = useState(false);
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);

  function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const generateRandomNumbers = useCallback(() => {
    setIsLoading(true);
    const min = 1;
    const max = 25;

    const generatedNumbers: number[] = [];

    while (generatedNumbers.length < 15) {
      const randomNumber = getRandomNumber(min, max);
      if (!generatedNumbers.includes(randomNumber)) {
        generatedNumbers.push(randomNumber);
      }
    }
    generatedNumbers.sort((a, b) => a - b);
    setRandomNumbers(generatedNumbers);
    setIsLoading(false);

  }, []);

  return (
    <>
      <h2>Lotofácil - Gerador de números</h2>

      <button
        className={styles.generateNumberButton}
        onClick={generateRandomNumbers}
      >
        {isLoading ?
          <Spinner width={24} height={24} color="" data-testid="spinner" />
          :
          'Gerar 15 números'}
      </button>

      <ul className={styles.generatedNumbersContainer}>
        {randomNumbers.map((number, index) => (
          <li key={index}>{number.toString().padStart(2, '0')}</li>
        ))}
      </ul>
    </>
  )
}