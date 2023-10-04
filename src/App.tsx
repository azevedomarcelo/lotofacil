import { GenerateNumbers } from "./components/GenerateNumbers";
import { LatestGame } from "./components/LatestGame";

import styles from './App.module.css';

function App() {
  return (
    <main className={styles.mainContent}>
      <GenerateNumbers />
      <LatestGame />
    </main >
  )
}
export default App
