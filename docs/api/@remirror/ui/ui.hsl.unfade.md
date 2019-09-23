<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@remirror/ui](./ui.md) &gt; [HSL](./ui.hsl.md) &gt; [unfade](./ui.hsl.unfade.md)

## HSL.unfade() method

Increase the opacity of the color.

Can either be a number or a string which represents a percentage.

```ts
const hsl = HSL.create('hsla(180, 50%, 50%, 0.5)')
color.unfade(40).a // => 90
color.unfade('25%').a // => 75

```

<b>Signature:</b>

```typescript
unfade(percent: number | string): HSL;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  percent | <code>number &#124; string</code> |  |

<b>Returns:</b>

`HSL`
