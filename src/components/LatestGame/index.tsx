import { useEffect, useState } from "react";
import axios from 'axios';

import { Spinner } from "../Spinner";

import { LotofacilLatestProps } from "../../@types/lotofacil";
import { currency, firstGame, secondGame } from "../../utils/formatter";

import styles from './styles.module.css';
import { compareNumbers } from "../../utils/compareNumbers";

export function LatestGame() {
  const [latest, setLatest] = useState<LotofacilLatestProps>();
  const [highlightedNumbersGameA, setHighlightedNumbersGameA] = useState<string[]>([])
  const [correctNumbersGame1, setCorrectNumbersGame1] = useState<number>(0)
  const [highlightedNumbersGameB, setHighlightedNumbersGameB] = useState<string[]>([])
  const [correctNumbersGame2, setCorrectNumbersGame2] = useState<number>(0)

  useEffect(() => {
    axios.get('https://loteriascaixa-api.herokuapp.com/api/lotofacil/latest')
      .then(response => response.data)
      .then((data: LotofacilLatestProps) => {
        setLatest(data);
        setCorrectNumbersGame1(compareNumbers(data.dezenas).game1.length)
        setCorrectNumbersGame2(compareNumbers(data.dezenas).game2.length)
        setHighlightedNumbersGameA(compareNumbers(data.dezenas).game1)
        setHighlightedNumbersGameB(compareNumbers(data.dezenas).game2)
      });
  }, []);

  return (
    <>
      <h2>Último resultado</h2>
      {latest ? (
        <section className={styles.latestSection}>
          <div>
            <span>Concurso: </span>
            <b data-testid="contestNumber">
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