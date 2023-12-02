# Theme Overrides

This directory is where you override the theme components.

Components inside this directory like:

```
SearchBar.tsx
SearchBar.module.css
```

Will automatically replace the `SearchBar` component inside the theme.

It is recommended to reference the original component and instead extend it.

This can make it easier to ensure that overriding components will always match the interface of the original component.
