import { renderEditor } from 'jest-remirror';

import { isExtensionValid } from '@remirror/testing';

import { PositionerExtension } from '../positioner-extension';
import { defaultPositioner } from '../positioners';

test('`PositionerExtension`: is valid', () => {
  expect(isExtensionValid(PositionerExtension)).toBeTrue();
});

test('can position itself', () => {
  const positioner = new PositionerExtension();
  const {
    add,
    nodes: { p, doc },
  } = renderEditor([positioner]);

  const onChange = jest.fn();

  expect(
    add(doc(p('hello <cursor>')))
      .callback(() => {
        positioner.addCustomHandler('positionerHandler', {
          onChange,
          element: document.createElement('div'),
          positioner: 'default',
        });
      })
      .insertText('a')
      .callback(() => {
        expect(onChange).toHaveBeenCalledWith({
          active: false,
          ...defaultPositioner.initialPosition,
        });
      })
      .selectText(1, 5)
      .callback(() => {
        expect(onChange).toHaveBeenCalledWith({
          active: true,
          ...defaultPositioner.initialPosition,
        });
      }),
  );
});
