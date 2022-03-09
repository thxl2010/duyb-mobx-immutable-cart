import { observer } from 'mobx-react-lite';
import { useAppleListStore } from '../../store/AppleListStore';

function Footer() {
  const appleListStore = useAppleListStore();
  const { pick } = appleListStore;

  return <button onClick={() => pick()}>摘苹果</button>;
}

export default observer(Footer);
