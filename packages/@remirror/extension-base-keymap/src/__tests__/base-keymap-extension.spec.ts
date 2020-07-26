import { renderEditor } from 'jest-remirror';

import { isExtensionValid } from '@remirror/testing';

import { BaseKeymapExtension } from '../..';

test('`BaseKeymapExtension`: is valid', () => {
  expect(isExtensionValid(BaseKeymapExtension)).toBeTrue();
});

test('supports custom keymaps', () => {
  const mock = jest.fn();
  const baseKeymapExtension = new BaseKeymapExtension();
  const {
    add,
    nodes: { p, doc },
  } = renderEditor([baseKeymapExtension]).callback(() => {
    baseKeymapExtension.addCustomHandler('keymap', { a: mock });
  });

  add(doc(p('Start<cursor>')))
    .press('a')
    .callback(() => {
      expect(mock).toHaveBeenCalled();
    });
});

test('supports default keymap', () => {
  const baseKeymapExtension = new BaseKeymapExtension();
  const {
    add,
    nodes: { p, doc },
  } = renderEditor([baseKeymapExtension]);

  add(doc(p('Start<cursor>')))
    .press('\n')
    .callback((content) => {
      expect(content.state.doc).toEqualRemirrorDocument(doc(p('Start'), p('')));
    });
});
