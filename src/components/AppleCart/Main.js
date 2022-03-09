import { observer } from 'mobx-react-lite';
import { useAppleListStore } from '../../store/AppleListStore';
import Apple from './Apple';

function Main() {
  const appleListStore = useAppleListStore();
  console.log('appleListStore :', appleListStore);
  const { applesInCart } = appleListStore;

  return (
    <section className="main">
      <ul className="apple-list">
        {applesInCart.map((apple) => (
          <Apple apple={apple} key={apple.id} />
        ))}
      </ul>
    </section>
  );
}

export default observer(Main);
