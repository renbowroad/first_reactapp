import React from 'react';
import styles from './style.module.css';

function PopulationTable (props: {
  pop: { year: number; value: number; };
}) {
  return(
    <tbody>
      <td className={styles.year}>{props.pop.year}</td>
      <td className={styles.value}>{props.pop.value.toLocaleString()}</td>
    </tbody> 
  )
}

export { PopulationTable };
// export default PopulationTable;
