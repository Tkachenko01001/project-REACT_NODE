import * as React from 'react';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import Modal from 'components/Modal/Modal';
// import { ThemeProvider, css } from '@emotion/react';
// import theme from './CalendarStyles';

import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
// Your App.tsx file
import 'react-day-picker/dist/style.css';
import './Calendar.css';
import { useDispatch } from 'react-redux';

const today=new Date();

// const css = `
//   .my-selected:not([disabled]) { 
//     font-weight: bold; 
//     background-color: green;
//   }
//   .my-selected:hover:not([disabled]) { 
//     border-color: blue;
//     color: blue;
//   }
//   .my-today { 
//     font-weight: bold;
//     font-size: 140%; 
//     color: red;
//   }
// `;

export default function CustomMonthLayout({ isModalOpen, toggleModal }) {

  const [selected, setSelected] = React.useState (today);
  const dispatch = useDispatch();

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, 'PP')}.</p>;
  }

  const handleClick = ()=>{
    dispatch()

  }

  return isModalOpen && (
    <Modal onClose={toggleModal}>
    {/* <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar showDaysOutsideCurrentMonth fixedWeekNumber={5} />
    </LocalizationProvider>
    </ThemeProvider> */}
    
    {/* <style>{css}</style> */}
    <DayPicker
       showOutsideDays
       ISOWeek
       required
       mode="single"
      selected={selected}
      onSelect={setSelected}
      footer={footer}
      onDayClick={handleClick}
      // modifiersClassNames={{
      //   selected: 'my-selected',
      //   // today: 'my-today'
      // }}
     
    />



    </Modal>
  );
}