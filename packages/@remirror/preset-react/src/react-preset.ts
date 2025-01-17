import { cx } from 'linaria';
import { Children, cloneElement } from 'react';

import {
  DefaultPresetOptions,
  isDocNodeEmpty,
  isString,
  OnSetOptionsParameter,
  Preset,
} from '@remirror/core';
import { PlaceholderExtension, PlaceholderOptions } from '@remirror/extension-placeholder';
import { ReactComponentExtension } from '@remirror/extension-react-component';
import { ReactSSRExtension, ReactSSROptions } from '@remirror/extension-react-ssr';
import { getElementProps } from '@remirror/react-utils';

export interface ReactPresetOptions extends ReactSSROptions, PlaceholderOptions {}

export class ReactPreset extends Preset<ReactPresetOptions> {
  static defaultOptions: DefaultPresetOptions<ReactPresetOptions> = {
    ...ReactSSRExtension.defaultOptions,
    ...PlaceholderExtension.defaultOptions,
  };

  get name() {
    return 'react' as const;
  }

  /**
   * No properties are defined so this can be ignored.
   */
  protected onSetOptions(parameter: OnSetOptionsParameter<ReactPresetOptions>) {
    const { changes } = parameter;

    if (changes.placeholder.changed) {
      const placeholderExtension = this.getExtension(PlaceholderExtension);
      placeholderExtension.setOptions({ placeholder: changes.placeholder.value });
    }
  }

  createExtensions() {
    const { transformers, emptyNodeClass, placeholder } = this.options;
    const placeholderExtension = new PlaceholderExtension({ emptyNodeClass, placeholder });
    this.addSSRToPlaceholder(placeholderExtension);

    const reactComponentExtension = new ReactComponentExtension();

    return [new ReactSSRExtension({ transformers }), placeholderExtension, reactComponentExtension];
  }

  private addSSRToPlaceholder(extension: PlaceholderExtension) {
    /**
     * Add a class and props to the root element if the document is empty.
     */
    extension.createSSRTransformer = () => {
      return (element: JSX.Element, state) => {
        state = state ?? this.extensionStore.getState();

        const { emptyNodeClass, placeholder } = extension.options;
        const { children } = getElementProps(element);

        if (Children.count(children) > 1 || !isDocNodeEmpty(state.doc)) {
          return element;
        }

        const properties = getElementProps(children);
        return cloneElement(
          element,
          {},
          cloneElement(children, {
            placeholder,
            className: cx(isString(properties.className) && properties.className, emptyNodeClass),
            'data-placeholder': placeholder,
          }),
        );
      };
    };
  }
}
