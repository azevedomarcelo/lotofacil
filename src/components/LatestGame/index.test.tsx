import { act, render, screen } from "@testing-library/react";
import { LatestGame } from ".";
import { compareNumbers } from "../../utils/compareNumbers";
import axios from "axios";
import { LotofacilLatestProps } from "../../@types/lotofacil";

describe("Latest Game", () => {

  it("should appear the title in the page", async () => {
    render(<LatestGame />);
    expect(screen.getByText(/Último resultado/i)).toBeInTheDocument();
  });

  it('should compare two arrays with the `dezenas sorteadas`', async () => {
    const dezenas = await axios.get<LotofacilLatestProps>
      ('https://loteriascaixa-api.herokuapp.com/api/lotofacil/latest')

    const result = compareNumbers(dezenas.data.dezenas);

    expect(result.game1.length).toBeGreaterThan(5)
    expect(result.game2.length).toBeGreaterThan(5)
  });

  it("should appear the `accumulated` message", async () => {
    const { data: dezena } = await axios.get<LotofacilLatestProps>
      ('https://loteriascaixa-api.herokuapp.com/api/lotofacil/latest');
    const accumulated = dezena.acumulou;

    if (accumulated) {
      expect(accumulated).toBeTruthy();
    } else {
      expect(accumulated).toBeFalsy();
    }
  });

  it("should appear the number of contest", async () => {
    render(<LatestGame />);
    await axios.get<LotofacilLatestProps>
      ('https://loteriascaixa-api.herokuapp.com/api/lotofacil/latest');

    act(() => {
      const contestNumber = screen.getByTestId("contestNumber");
      expect(contestNumber).toBeInTheDocument();
    });
  });

});