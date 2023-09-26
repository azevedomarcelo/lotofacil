import { useCallback, useState } from "react";

import styles from './App.module.css';

function App() {
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function getRandomNumber(min: number, max: number): number {
    // Generate a random integer between min and max (inclusive).
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const generateRandomNumbers = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      const min = 1; // Minimum number (01)
      const max = 25; // Maximum number

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
    }, 1000)

  }, []);

  return (
    <main className={styles.mainContent}>
      <h2>Lotofácil - Gerador de números</h2>

      <button
        className={isLoading ? styles.generateNumberButtonDisabled : styles.generateNumberButton}
        onClick={generateRandomNumbers}
      >
        Gerar 15 números
      </button>

      <ul className={styles.generatedNumbersContainer}>
        {randomNumbers.map((number, index) => (
          <li key={index}>{number.toString().padStart(2, '0')}</li>
        ))}
      </ul>
    </main>
  )
}

export default App
