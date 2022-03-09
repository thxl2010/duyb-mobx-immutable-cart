import { observer } from 'mobx-react-lite';

function Apple({ apple }) {
  return (
    <li>
      <div className="apple">
        <span>
          {apple.name} - {apple.id}号
        </span>
      </div>
    </li>
  );
}

export default observer(Apple);
