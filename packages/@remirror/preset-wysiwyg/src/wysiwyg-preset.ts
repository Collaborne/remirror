import {
  DefaultPresetOptions,
  GetStaticAndDynamic,
  HandlerKeyList,
  isEmptyObject,
  OnSetOptionsParameter,
  Preset,
  StaticKeyList,
} from '@remirror/core';
import { BidiExtension, BidiOptions } from '@remirror/extension-bidi';
import { BlockquoteExtension } from '@remirror/extension-blockquote';
import { BoldExtension, BoldOptions } from '@remirror/extension-bold';
import { CodeExtension } from '@remirror/extension-code';
import { CodeBlockExtension, CodeBlockOptions } from '@remirror/extension-code-block';
import { DropCursorExtension, DropCursorOptions } from '@remirror/extension-drop-cursor';
import { EpicModeExtension } from '@remirror/extension-epic-mode';
import { GapCursorExtension } from '@remirror/extension-gap-cursor';
import { HardBreakExtension } from '@remirror/extension-hard-break';
import { HeadingExtension, HeadingOptions } from '@remirror/extension-heading';
import { HorizontalRuleExtension } from '@remirror/extension-horizontal-rule';
import { ImageExtension } from '@remirror/extension-image';
import { ItalicExtension } from '@remirror/extension-italic';
import { LinkExtension, LinkOptions } from '@remirror/extension-link';
import { SearchExtension, SearchOptions } from '@remirror/extension-search';
import { StrikeExtension } from '@remirror/extension-strike';
import { TrailingNodeExtension, TrailingNodeOptions } from '@remirror/extension-trailing-node';
import { UnderlineExtension } from '@remirror/extension-underline';
import { EmbedOptions, EmbedPreset } from '@remirror/preset-embed';
import { ListPreset } from '@remirror/preset-list';
import { TableOptions, TablePreset } from '@remirror/preset-table';

export interface WysiwygOptions
  extends BidiOptions,
    BoldOptions,
    CodeBlockOptions,
    DropCursorOptions,
    HeadingOptions,
    LinkOptions,
    SearchOptions,
    TrailingNodeOptions {}

export class WysiwygPreset extends Preset<WysiwygOptions> {
  static readonly staticKeys: StaticKeyList<WysiwygOptions> = [
    'defaultLevel',
    'excludeNodes',
    'highlightedClass',
    'levels',
    'searchClass',
    'weight',
  ];
  static readonly handlerKeys: HandlerKeyList<WysiwygOptions> = [
    'onActivateLink',
    'onDestroy',
    'onInit',
    'onSearch',
  ];

  static readonly defaultOptions: DefaultPresetOptions<WysiwygOptions> = {
    ...BidiExtension.defaultOptions,
    ...BoldExtension.defaultOptions,
    ...CodeBlockExtension.defaultOptions,
    ...DropCursorExtension.defaultOptions,
    ...SearchExtension.defaultOptions,
    ...TrailingNodeExtension.defaultOptions,
    ...HeadingExtension.defaultOptions,
  };

  get name() {
    return 'wysiwyg' as const;
  }

  protected onSetOptions(parameter: OnSetOptionsParameter<WysiwygOptions>) {
    const { pickChanged } = parameter;
    const trailingNodeOptions = pickChanged(['disableTags', 'ignoredNodes', 'nodeName']);
    const bidiOptions = pickChanged(['defaultDirection', 'autoUpdate']);
    const codeBlockOptions = pickChanged([
      'defaultLanguage',
      'formatter',
      'toggleName',
      'syntaxTheme',
      'supportedLanguages',
      'keyboardShortcut',
    ]);
    const dropCursorOptions = pickChanged([
      'afterBlockClassName',
      'afterInlineClassName',
      'beforeBlockClassName',
      'beforeInlineClassName',
      'blockClassName',
      'blockHeight',
      'blockWidth',
      'color',
      'inlineClassName',
      'inlineSpacing',
      'inlineWidth',
    ]);
    const searchOptions = pickChanged([
      'alwaysSearch',
      'autoSelectNext',
      'caseSensitive',
      'clearOnEscape',
      'disableRegex',
      'searching',
      'searchForwardShortcut',
      'searchBackwardShortcut',
    ]);

    if (!isEmptyObject(bidiOptions)) {
      this.getExtension(BidiExtension).setOptions(bidiOptions);
    }

    if (!isEmptyObject(codeBlockOptions)) {
      this.getExtension(CodeBlockExtension).setOptions(codeBlockOptions);
    }

    if (!isEmptyObject(dropCursorOptions)) {
      this.getExtension(DropCursorExtension).setOptions(dropCursorOptions);
    }

    if (!isEmptyObject(searchOptions)) {
      this.getExtension(SearchExtension).setOptions(searchOptions);
    }

    if (!isEmptyObject(trailingNodeOptions)) {
      this.getExtension(TrailingNodeExtension).setOptions(trailingNodeOptions);
    }
  }

  createExtensions() {
    const gapCursorExtension = new GapCursorExtension();
    const hardBreakExtension = new HardBreakExtension();
    const horizontalRuleExtension = new HorizontalRuleExtension();
    const imageExtension = new ImageExtension();
    const italicExtension = new ItalicExtension();
    const strikeExtension = new StrikeExtension();
    const underlineExtension = new UnderlineExtension();
    const blockquoteExtension = new BlockquoteExtension();
    const codeExtension = new CodeExtension();

    const linkExtension = new LinkExtension();
    linkExtension.addHandler('onActivateLink', this.options.onActivateLink);

    const { autoUpdate, defaultDirection, excludeNodes } = this.options;
    const bidiExtension = new BidiExtension({ autoUpdate, defaultDirection, excludeNodes });

    const { weight } = this.options;
    const boldExtension = new BoldExtension({ weight });

    const {
      defaultLanguage,
      formatter,
      toggleName,
      syntaxTheme,
      supportedLanguages,
      keyboardShortcut,
    } = this.options;
    const codeBlockExtension = new CodeBlockExtension({
      defaultLanguage,
      formatter,
      toggleName,
      syntaxTheme,
      supportedLanguages,
      keyboardShortcut,
    });

    const {
      afterBlockClassName,
      afterInlineClassName,
      beforeBlockClassName,
      beforeInlineClassName,
      blockClassName,
      blockHeight,
      blockWidth,
      color,
      inlineClassName,
      inlineSpacing,
      inlineWidth,
    } = this.options;
    const dropCursorExtension = new DropCursorExtension({
      afterBlockClassName,
      afterInlineClassName,
      beforeBlockClassName,
      beforeInlineClassName,
      blockClassName,
      blockHeight,
      blockWidth,
      color,
      inlineClassName,
      inlineSpacing,
      inlineWidth,
    });
    dropCursorExtension.addHandler('onDestroy', this.options.onDestroy);
    dropCursorExtension.addHandler('onInit', this.options.onInit);

    const epicModeExtension = new EpicModeExtension({ active: false });

    const { defaultLevel, levels } = this.options;
    const headingExtension = new HeadingExtension({ defaultLevel, levels });

    const {
      alwaysSearch,
      autoSelectNext,
      caseSensitive,
      clearOnEscape,
      disableRegex,
      highlightedClass,
      searching,
      searchForwardShortcut,
      searchClass,
      searchBackwardShortcut,
    } = this.options;
    const searchExtension = new SearchExtension({
      alwaysSearch,
      autoSelectNext,
      caseSensitive,
      clearOnEscape,
      disableRegex,
      highlightedClass,
      searching,
      searchForwardShortcut,
      searchClass,
      searchBackwardShortcut,
    });
    searchExtension.addHandler('onSearch', this.options.onSearch);

    const { disableTags, ignoredNodes, nodeName } = this.options;
    const trailingNodeExtension = new TrailingNodeExtension({
      disableTags,
      ignoredNodes,
      nodeName,
    });

    return [
      // Plain
      bidiExtension,
      dropCursorExtension,
      epicModeExtension,
      gapCursorExtension,
      searchExtension,
      trailingNodeExtension,

      // Nodes
      hardBreakExtension,
      imageExtension,
      horizontalRuleExtension,
      blockquoteExtension,
      codeBlockExtension,
      headingExtension,

      // Marks
      boldExtension,
      codeExtension,
      strikeExtension,
      italicExtension,
      linkExtension,
      underlineExtension,
    ];
  }
}

/**
 * The parameter for creating a list of presets needed to use the wysiwyg preset
 * to the full.
 */
export interface CreateWysiwygPresetListOptions {
  /**
   * The options for the wysiwyg preset.
   */
  wysiwyg?: GetStaticAndDynamic<WysiwygOptions>;

  /**
   * The options for the embed preset.
   */
  embed?: GetStaticAndDynamic<EmbedOptions>;

  /**
   * The options for the table preset.
   */
  table?: GetStaticAndDynamic<TableOptions>;
}

/**
 * Create the wysiwyg preset and also apply the other presets as well.
 */
export function createWysiwygPresetList(
  options: CreateWysiwygPresetListOptions,
): WysiwygPresetCombinedUnion[] {
  const { wysiwyg, embed, table } = options;

  return [
    new WysiwygPreset(wysiwyg),
    new ListPreset(),
    new EmbedPreset(embed),
    new TablePreset(table),
  ];
}

export type WysiwygPresetCombinedUnion = WysiwygPreset | ListPreset | EmbedPreset | TablePreset;
