const { createTheme } = require("@mui/material");

const theme = createTheme({
    components: {
      // Name of the component
      MuiDateCalendar: {
        styleOverrides: {
          // Name of the slot
          root: {
            backgroundColor: 'grey',
            // fontSize: '3rem',

            // Some CSS
            
          },
        },
      },
      
      MuiDayCalendar: {
        styleOverrides: {
          
          weekDayLabel: {
            color: 'var(--color-icon-grey)',                       
          },
        },
      },
      
      // Mui:{
      //   styleOverrides:{
      //     selected:{
      //       backgroundColor: 'green',
      //     },
      //   },
      // },


      MuiPickersDay:{
        
        styleOverrides:{
          root:{
            color: 'var(--color-white)',
            fontFamily: 'Poppins',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: '18px', /* 128.571% */
            letterSpacing: '-0.28px',
            // &.Mui-selected:{
            //   backgroundColor: 'green',
            // },  
            // selected:{
            //   backgroundColor: 'green',
            // },         
        },
        
        selected:{
          backgroundColor: 'green',
        },
          today:{
            border:'1px solid red',
          },
          
        },
      },
    },
  });

  export default theme




  // <div className={styles.wrapper}>
  //     <button className={styles.filter} onClick={toggleModal}>
  //       <svg className={styles.icon} width={16} height={16} aria-label="Filter">
  //         <title>Filter Icon</title>
  //         <use href={sprite + '#icon-filter'} />
  //       </svg>
  //       <span className={styles.filterText}>Filters</span>
  //     </button>
  //     <CustomMonthLayout isModalOpen={isModalOpen} toggleModal={toggleModal}/>
  //   </div>