import {
  AnyCombinedUnion,
  BuiltinPreset,
  getLazyArray,
  isRemirrorManager,
  RemirrorManager,
} from '@remirror/core';
import { CorePreset } from '@remirror/preset-core';
import { ReactPreset } from '@remirror/preset-react';

import { CreateReactManagerOptions } from './react-types';

/**
 * Create a react manager with all the default react presets and extensions.
 */
export function createReactManager<Combined extends AnyCombinedUnion>(
  combined:
    | Combined[]
    | (() => Combined[])
    | RemirrorManager<Combined | BuiltinPreset | ReactPreset | CorePreset>,
  options: CreateReactManagerOptions = {},
): RemirrorManager<Combined | BuiltinPreset | ReactPreset | CorePreset> {
  const { core, react, ...settings } = options;

  if (isRemirrorManager<Combined | BuiltinPreset | ReactPreset | CorePreset>(combined)) {
    return combined;
  }

  return RemirrorManager.create(
    () => [...getLazyArray(combined), new ReactPreset(react), new CorePreset(core)],
    settings,
  );
}
