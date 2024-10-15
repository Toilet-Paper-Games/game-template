import { observer } from 'mobx-react-lite';
import { hosterGameModel } from '../App';
import { absolute, Card, FlexColumn } from '@toilet-paper-games/ui';

export const Game = observer(() => {
  const count = hosterGameModel.count;

  return (
    <FlexColumn justifyContent="center" alignItems="center" css={[absolute(0, 0, 0, 0)]}>
      <Card>
        <p>Click Button on Controller!</p>
        <p css={{ textAlign: 'center', color: 'darkgoldenrod', fontSize: '1.5em' }}>
          {count}
        </p>
      </Card>
    </FlexColumn>
  );
});
