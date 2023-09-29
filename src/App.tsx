import { useCallback, useEffect, useState } from "react";
import { LotofacilLatestProps } from "./@types/lotofacil";

import styles from './App.module.css';
import { currency } from "./utils/formatter";

function App() {
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
  const [latest, setLatest] = useState<LotofacilLatestProps>();
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

  useEffect(() => {
    fetch('https://loteriascaixa-api.herokuapp.com/api/lotofacil/latest')
      .then(response => response.json())
      .then(data => { setLatest(data); console.log(data) })
  }, [])

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

      <h2>Último resultado</h2>
      {latest && (
        <section className={styles.latestSection}>
          <div>
            <span>Concurso: </span>
            <b>
              {latest.concurso} ({latest.data})
            </b>
          </div>

          <div className={styles.dezenasSection}>
            <p>Dezenas sorteadas:</p>
            <div className={styles.dezenas}>
              {latest.dezenas.map(dezena => (
                <p>{dezena}</p>
              ))}
            </div>
          </div>

          <div className={styles.award}>
            {latest.acumulou ? (
              <h1 className={styles.accumulated}>Acumulou!</h1>
            ) : (
              <div className={styles.awardResults}>
                <div className={styles.winners}>
                  <span>Ganhadores:</span>

                  {latest.localGanhadores.map(local => (
                    <p>
                      {local.ganhadores}
                      {' - '}
                      <strong className={styles.cityWinner}>
                        {`${local.municipio.toLowerCase()} - ${local.uf}`}
                      </strong>
                    </p>
                  ))}
                </div>

                <div>
                  {latest.premiacoes.map(premio => (
                    <p>
                      {premio.descricao} - <b>{currency.format(premio.valorPremio)}</b> ({premio.ganhadores > 1 ? `${premio.ganhadores} ganhadores` : `${premio.ganhadores} ganhador`})
                    </p>
                  ))}
                </div>

              </div>

            )}
          </div>

          <div>
            <p>Próximo concurso:</p>
            <b>
              {latest.dataProximoConcurso}
            </b>
          </div>

          <div>
            <p>Estimativa de prêmio para o próximo concurso:</p>
            <b>
              {currency.format(latest.valorEstimadoProximoConcurso)}
            </b>
          </div>

        </section>
      )}
    </main>
  )
}

export default App
