import { observer } from 'mobx-react-lite';
import { controllerGameModel } from '../App';
import { absolute, Button, FlexColumn } from '@toilet-paper-games/ui';

export const Game = observer(() => {
  const count = controllerGameModel.count;

  return (
    <FlexColumn justifyContent="center" alignItems="center" css={[absolute(0, 0, 0, 0)]}>
      <Button
        shadow
        onClick={controllerGameModel.sendIncrementCount}
        css={{ width: 100, height: 100 }}
      >
        {count}
      </Button>
    </FlexColumn>
  );
});
