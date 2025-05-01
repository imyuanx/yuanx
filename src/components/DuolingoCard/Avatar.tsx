import { useLayoutEffect, useState } from 'react';

import {
  Alignment,
  Fit,
  Layout,
  StateMachineInput,
  useRive,
} from '@rive-app/react-canvas';

import useDuolingoInfo from '@/common/useDuolingoInfo';

// Rive state machine
const STATE_MACHINE_NAME = 'SMAvatar';
const ZOOM_LEVEL_INPUT_NAME = 'ZoomLevel';
const ENG_ONLY_ANIMATION_INPUT = 'ENG_ONLY_Animation';
const DEFAULT_ZOOM_LEVEL = 1;

export type AvatarStates = {
  [key: string]: number | boolean;
};

function Avatar() {
  const { duolingoInfo } = useDuolingoInfo();
  const [noAnimation, setNoAnimation] = useState<boolean>(false);
  const zoomLevelDefault = DEFAULT_ZOOM_LEVEL;

  const avatarStates = duolingoInfo?.avatarStates?.builtAvatarStates[0].state;

  const { RiveComponent, rive } = useRive({
    src: '/avatar.riv',
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,
    layout: new Layout({
      alignment: Alignment.Center,
      fit: Fit.Cover,
    }),
  });

  const updateAvatarStateInputs = (
    inputs: StateMachineInput[],
    states?: AvatarStates
  ) => {
    if (!states) return;

    inputs.forEach((input: StateMachineInput) => {
      if (states[input.name] !== undefined) {
        input.value = states[input.name];
      }
    });
  };

  const applyDefaultZoomLevel = (
    zoomInput: StateMachineInput | undefined,
    states?: AvatarStates,
    defaultZoom?: number
  ) => {
    if (!zoomInput || defaultZoom === undefined) return;

    if (states && states[ZOOM_LEVEL_INPUT_NAME] === undefined) {
      // 当状态中未设置缩放级别时，应用默认值
      zoomInput.value = defaultZoom;
    } else if (!states) {
      // 当无状态数据时，应用默认值
      zoomInput.value = defaultZoom;
    }
  };

  const toggleAnimation = (
    animationInput: StateMachineInput | undefined,
    disableAnimation: boolean
  ) => {
    if (disableAnimation && animationInput) {
      animationInput.value = 0; // 禁用动画
    }
  };

  // 当相关状态变化时，更新Rive状态机的输入值
  useLayoutEffect(() => {
    if (!rive) return;

    const inputs = rive.stateMachineInputs(STATE_MACHINE_NAME);
    if (!inputs) return;

    // 获取特定输入控制器
    const zoomLevelInput = inputs.find(
      (input) => input.name === ZOOM_LEVEL_INPUT_NAME
    );
    const engOnlyAnimationInput = inputs.find(
      (input) => input.name === ENG_ONLY_ANIMATION_INPUT
    );

    // 应用各种状态更新
    updateAvatarStateInputs(inputs, avatarStates);
    applyDefaultZoomLevel(zoomLevelInput, avatarStates, zoomLevelDefault);
    toggleAnimation(engOnlyAnimationInput, noAnimation);
  }, [avatarStates, rive, noAnimation, zoomLevelDefault]);

  return (
    <div className="h-14 w-14 overflow-hidden rounded-full">
      <RiveComponent />
    </div>
  );
}

export default Avatar;
