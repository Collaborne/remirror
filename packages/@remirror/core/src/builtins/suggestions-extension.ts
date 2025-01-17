import { ExtensionPriority } from '@remirror/core-constants';
import { isArray } from '@remirror/core-helpers';
import { suggest, Suggestion } from '@remirror/pm/suggest';

import { PlainExtension } from '../extension';

/**
 * This extension allows others extension to add the `createSuggestion` method
 * for adding the prosemirror-suggest functionality to your editor.
 *
 * @remarks
 *
 * This is an example of adding custom functionality to an extension via the
 * `ExtensionParameterMethods`.
 *
 * @builtin
 */
export class SuggestionsExtension extends PlainExtension {
  static readonly defaultPriority = ExtensionPriority.Default;

  get name() {
    return 'suggestions' as const;
  }

  /**
   * Ensure that all ssr transformers are run.
   */
  onCreate = () => {
    const suggesters: Suggestion[] = [];

    for (const extension of this.store.extensions) {
      if (
        // Manager settings excluded this from running
        this.store.managerSettings.exclude?.suggesters ||
        // Method doesn't exist
        !extension.createSuggestions ||
        // Extension settings exclude it from running
        extension.options.exclude?.suggesters
      ) {
        continue;
      }

      const suggester = extension.createSuggestions();

      suggesters.push(...(isArray(suggester) ? suggester : [suggester]));
    }

    this.store.addPlugins(suggest(...suggesters));
  };
}

declare global {
  namespace Remirror {
    interface ExcludeOptions {
      /**
       * Whether to exclude the suggesters plugin configuration for the extension.
       *
       * @defaultValue `undefined`
       */
      suggesters?: boolean;
    }

    interface ExtensionCreatorMethods {
      /**
       * Create suggesters which respond to character key combinations within the
       * editor instance.
       *
       * @remarks
       *
       * Suggestions are a very powerful way of building up the editors
       * functionality. They can support `@` mentions, `#` tagging, `/` special
       * command keys which trigger an actions menu and much more.
       */
      createSuggestions?(): Suggestion[] | Suggestion;
    }
  }
}
