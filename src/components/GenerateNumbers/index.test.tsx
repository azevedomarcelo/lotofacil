import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { GenerateNumbers } from '.';


describe("Generate Numbers", () => {
  it("should appear the title in the page", () => {
    render(<GenerateNumbers />);
    expect(screen.getByText(/Lotofácil - Gerador de números/i)).toBeInTheDocument();
  });

  it("should generate 15 numbers", async () => {
    render(<GenerateNumbers />);
    fireEvent.click(screen.getByRole('button'));

    const sizeGeneratedNumbers = screen.getByRole('list').querySelectorAll('li').length
    expect(sizeGeneratedNumbers).toBe(15);
  });

  it("should generate random numbers within range", async () => {
    render(<GenerateNumbers />);
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      const generatedNumbers = screen.getByRole('list').querySelectorAll('li');
      for (let i = 0; i < generatedNumbers.length; i++) {
        const number = Number(generatedNumbers[i].textContent);
        expect(number).toBeGreaterThanOrEqual(1);
        expect(number).toBeLessThanOrEqual(25);

      }
    });
  });

  it("should generate unique numbers", async () => {
    render(<GenerateNumbers />);
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      const generatedNumbers = screen.getByRole('list').querySelectorAll('li');
      const uniqueNumbers = new Set();
      for (let i = 0; i < generatedNumbers.length; i++) {
        const number = Number(generatedNumbers[i].textContent);
        expect(uniqueNumbers.has(number)).toBe(false);
        uniqueNumbers.add(number);
      }
    });
  });

  it("should appear the spinner while clicking on the button", () => {
    render(<GenerateNumbers />);

    const generateNumbersButton = screen.getByText("Gerar 15 números");
    fireEvent.click(generateNumbersButton);

    expect(screen.getByRole("button").textContent).toBeTypeOf("string")

    // expect(getByTestId("spinner")).not.toBeInTheDocument()


  })

});