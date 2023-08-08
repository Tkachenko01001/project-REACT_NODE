// import sprite from '../../images/sprite.svg';

import styles from './MainDashboard.module.css';

const MainDashboard = () => {
  return (
    // <div className={styles.container}>
    //   <button className={styles.button}>
    //     <svg width={28} height={28} aria-label="plus" className={styles.svg}>
    //       <title>Plus Icon</title>
    //       <use href={sprite + '#icon-plus'}/>
    //     </svg>
    //     <span className={styles.buttonText}>Add another column</span>
    //   </button>
    // </div>
    <div className={styles.mainDashboardContainer}>
      {/* <div className={styles.dashboardDefault}> */}
      <p className={styles.dashboardDefaultParagraph}>
        Before starting your project, it is essential
        <span className={styles.createBoard}> to create a board </span> to
        visualize and track all the necessary tasks and milestones. This board
        serves as a powerful tool to organize the workflow and ensure effective
        collaboration among team members.
      </p>
      {/* </div> */}
    </div>
  );
};

export default MainDashboard;
