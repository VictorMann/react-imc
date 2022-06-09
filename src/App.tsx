import { useState } from 'react'; 

import styles from './App.module.css';
import poweredImage from './assets/powered.png';
import leftArrowImage from './assets/leftarrow.png';
import { levels, calculateImc, Level } from './helpers/imc';

import { GridItem } from './components/GridItem';

function App() {

  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);

  const handleCalculeButton = () => {
    if (heightField && weightField) {
      setToShow(calculateImc(heightField, weightField));
    } else {
      alert("digite todos os campos");
    }
  };

  const handleBackButton = () => {
    setToShow(null);
  };

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" width={150} />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC.</h1>
          <p>
            IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela 
            Organização Mundial de Saúde para cálcular o peso ideal de cada pessoa.
          </p>

          <input
            type="number"
            placeholder="Digite a sua altura. Ex: 1.5 (em métros)"
            value={heightField > 0 ? heightField : ''}
            onChange={e => setHeightField(parseFloat(e.target.value))}/>

          <input
            type="number"
            placeholder="Digite o peso. Ex: 73.5 (em kg)"
            value={weightField > 0 ? weightField : ''}
            onChange={e => setWeightField(parseFloat(e.target.value))}/>

          <button onClick={handleCalculeButton}>Calcular</button>
        </div>
        <div className={styles.rightSide}>
          {toShow 
          ? 
            <div className={styles.gridBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt="" width="25" />
              </div>
              <GridItem item={toShow} />
            </div>
          :
            <div className={styles.grid}>
              {levels.map((item,key) =>
                <GridItem key={key} item={item} />
              )}
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
