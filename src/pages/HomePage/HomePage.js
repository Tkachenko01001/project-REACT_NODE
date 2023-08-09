import css from '../HomePage/HomePage.module.css';
import Layout from 'components/Layout/Layout';
import ScreensPage from 'components/ScreensPage/ScreensPage';

export default function HomePage() {
  return (
    <div className={css.home}>
      <Layout />
      <div className={css.homeWrap}>
        <div className={css.headerBox}>Header</div>
        <ScreensPage />
      </div>
    </div>
  );
}
