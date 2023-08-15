import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { usePopper } from 'react-popper';
import FocusTrap from 'focus-trap-react';
import { useRef, useState } from 'react';
import 'react-day-picker/dist/style.css';
import css from './Calendar.module.css';
import { selectTheme } from 'redux/auth/selectors';
import { useSelector } from 'react-redux';

export default function CustomMonthLayout({ daySelected, setDaySelected }) {
  const theme = useSelector(selectTheme);
  const DateBefore = { before: new Date() };

  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const popperRef = useRef(null);
  const buttonRef = useRef(null);
  const [popperElement, setPopperElement] = useState(null);
  const popper = usePopper(popperRef.current, popperElement, {
    placement: 'top',
  });
  const closePopper = () => {
    setIsPopperOpen(false);
    buttonRef?.current?.focus();
  };
  const handleButtonClick = e => {
    setIsPopperOpen(true);
  };

  const handleDaySelect = date => {
    setDaySelected(date);
    if (date) {
      closePopper();
    }
  };

  let footer = <p>Please pick a day.</p>;
  if (daySelected) {
    footer = <p>You picked {format(daySelected, 'PP')}.</p>;
  }

  return (
    <div>
      <div ref={popperRef}>
        <button
          className={css.calendarButton}
          ref={buttonRef}
          type="button"
          aria-label="Pick a date"
          onClick={handleButtonClick}
        >
          Deadline: {format(daySelected, 'dd/MM/yyyy')}
        </button>
      </div>
      {isPopperOpen && (
        <FocusTrap active className={css.calendarWrapper}>
          <div
            tabIndex={-1}
            style={popper.styles.popper}
            className={theme === 'dark' ? css.dark : css.light}
            {...popper.attributes.popper}
            ref={setPopperElement}
            role="dialog"
            aria-label="DayPicker calendar"
          >
            <DayPicker
              initialFocus={isPopperOpen}
              mode="single"
              defaultMonth={daySelected}
              selected={daySelected}
              onSelect={handleDaySelect}
              showOutsideDays
              ISOWeek
              required
              disabled={DateBefore}
              footer={footer}
            />
          </div>
        </FocusTrap>
      )}
    </div>
  );
}
