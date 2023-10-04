import { useEffect, useState } from "react";
import { Spinner } from "../Spinner";

import { LotofacilLatestProps } from "../../@types/lotofacil";
import { currency, firstGame, secondGame } from "../../utils/formatter";

import styles from './styles.module.css';

export function LatestGame() {
  const [latest, setLatest] = useState<LotofacilLatestProps>();
  const [highlightedNumbersGameA, setHighlightedNumbersGameA] = useState<string[]>([])
  const [correctNumbersGame1, setCorrectNumbersGame1] = useState<number>(0)
  const [highlightedNumbersGameB, setHighlightedNumbersGameB] = useState<string[]>([])
  const [correctNumbersGame2, setCorrectNumbersGame2] = useState<number>(0)

  const compareNumbers = (dezenas: string[]) => {
    const commonNumbersGame1 = dezenas.filter((number) => firstGame.includes(number));
    const commonNumbersGame2 = dezenas.filter((number) => secondGame.includes(number));
    setCorrectNumbersGame1(commonNumbersGame1.length);
    setCorrectNumbersGame2(commonNumbersGame2.length)
    setHighlightedNumbersGameA(commonNumbersGame1)
    setHighlightedNumbersGameB(commonNumbersGame2)
  };

  useEffect(() => {
    fetch('https://loteriascaixa-api.herokuapp.com/api/lotofacil/latest')
      .then(response => response.json())
      .then((data: LotofacilLatestProps) => {
        setLatest(data);
        compareNumbers(data.dezenas)
      })
  }, [])

  return (
    <>
      <h2>Último resultado</h2>
      {latest ? (
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
              {latest.dezenas.map((dezena, index) => (
                <p key={index}>{dezena}</p>
              ))}
            </div>

            <hr />
            <div className={styles.gamePlayedContent}>
              A:
              {firstGame.map((num, index) => (
                <span
                  key={index}
                  className={highlightedNumbersGameA.includes(num) ? styles.highlight : ''}
                >
                  {num}
                </span>
              ))}
              <strong>
                ({correctNumbersGame1} acertos)
              </strong>
            </div>
            <hr />
            <div className={styles.gamePlayedContent}>
              B:
              {secondGame.map((num, index) => (
                <span
                  key={index}
                  className={highlightedNumbersGameB.includes(num) ? styles.highlight : ''}
                >
                  {num}
                </span>
              ))}
              <strong>
                ({correctNumbersGame2} acertos)
              </strong>
            </div>
            <hr />
          </div>

          <div className={styles.award}>
            {latest.acumulou ? (
              <h1 className={styles.accumulated}>Acumulou!</h1>
            ) : (
              <div className={styles.awardResults}>
                <div className={styles.winners}>
                  <span>Ganhadores:</span>

                  {latest.localGanhadores.map((local, index) => (
                    <p key={`${local.uf}-${index}`}>
                      {local.ganhadores}
                      {' - '}
                      <strong className={styles.cityWinner}>
                        {`${local.municipio.toLowerCase()} - ${local.uf}`}
                      </strong>
                    </p>
                  ))}
                </div>

                <div>
                  {latest.premiacoes.map((premio, index) => (
                    <p key={`${premio.ganhadores}-${index}`}>
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
      ) : (
        <Spinner width={50} height={50} />
      )}
    </>
  )
}