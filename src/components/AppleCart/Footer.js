import { observer } from 'mobx-react-lite';
import { useAppleListStore } from '../../store/AppleListStore';

import styles from './style.module.css';

function Footer() {
  const appleListStore = useAppleListStore();
  const { loading, loadApple } = appleListStore;

  return (
    <div className={styles.footer}>
      <button
        onClick={() => loadApple()}
        className={[
          `${styles.btnSuccess}`,
          loading ? `${styles.loading}` : '',
        ].join(' ')}
      >
        {loading ? '正在采摘...' : '摘苹果'}
      </button>
    </div>
  );
}

export default observer(Footer);
