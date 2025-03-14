# Polykey-Docs

Documentation for Polykey.

## Development

Run `nix develop`, and once you're inside, you can use:

```sh
# run local docusaurus server (for quick edits)
npm run start
# build the the static site
npm run build
npm run build -- --dev # for development build
# run local cloudflare server (to test backend too)
npm run dev
# deploy to cloudflare
npm run deploy
# lint the source code
npm run lint
# automatically fix the source
npm run lintfix
```

We use Git LFS to store all media in `images/**` and `files/**`. It's important
to ensure that `git-lfs` is installed on your system before you contribute
anything (on NixOS, it is installed as a separate package to `git`). By default
anything put under `images/**` or `files/**` when using `git add` (after LFS is
setup) will be uploaded to LFS, and thus the repository will only have links.
Because LFS is enabled, it is used on GitHub.

If this is the first time you cloned the repository, you must use
`git lfs install` to ensure your local repository has LFS setup. It may be
automatically setup if you already had it installed prior to cloning.

Pro-tip, if we need to make sure files that were accidentally not put into LFS
must be put into LFS, the command to use is:

```sh
git lfs migrate import --include="/static/images/**" --everything
git lfs migrate import --include="/static/files/**" --everything
git lfs migrate import --include="/static/fonts/**" --everything
```

Sometimes when you change branches, certain LFS references may not yet be
resolved, in those cases you should just use (such as doing a
`git lfs migrate import`):

```sh
git lfs pull
```

## Contributing

Because we use docusaurus, we can choose to write in markdown, TSX or MDX.

### HTML Syntax

Sometimes markdown syntax just doesn't cut it, and HTML syntax needs to be used.

While `docusaurus` is flexible, GitHub is not.

GitHub will process the markdown and then sanitizes the HTML:
https://github.com/github/markup#github-markup.

There is a limited set of HTML tags are here:
https://github.com/gjtorikian/html-pipeline/blob/03ae30d713199c2562951d627b98b75dc16939e4/lib/html/pipeline/sanitization_filter.rb#L40-L49

Furthermore not all attributes are kept. The `style` attribute for example is
filtered out.

The most common styling attributes to be used will most likely be `align`,
`width`, and `height`. See:
https://davidwells.io/snippets/how-to-align-images-in-markdown

### Linking Assets (files, images)

Markdown supports markdown-syntax and HTML tags for referencing assets:

```md
![](/images/foobar.png)

[Download This](/files/x.docx)

<img src="/images/foobar.png" />

<a href="/files/x.docx" />
```

In order to maintain portability, we always use absolute paths. This works on
GitHub markdown rendering and also for `docusaurus`.

The markdown syntax will render properly for markdown previews. However the HTML
references may not work when compiled by docusaurus.

This is because, it relies on the static asset reference that is not subject to
webpack asset processing pipeline. The pipeline ensures that caching,
cache-busting, base URL all works.

Avoid using the raw HTML tags with paths like the above, instead use:

```mdx
<img src={require('@site/images/foobar.png').default} />

<a href={require('@site/files/x.docx').default} />
```

This applies to all HTML tags like `<img>`, `<a>`, `<video>`, `<audio>`, and
`<picture>`.

Make sure to use the `@site` alias to get an absolute path load.

If for some reason, you must avoid webpack asset pipeline, then make sure to use
`useBaseUrl`, otherwise the compiled link may be incorrect:

```mdx
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/images/foobar.png')} />;
```

The only downside here is that these assets won't render on markdown previews
because they require JS interpretation. Therefore prefer to use the markdown
syntax when possible.

```md
<div align="center">

![](/images/foobar.png)

</div>
```

Take note of the whitespace newlines between, if no newlines are used, GitHub
will interpret this as all HTML. Also note that `<p></p>` will not work.

Note that this won't work for resizing the images unfortunately. You have to
apply the `width` attribute directly to the `<img />` tag. See:
https://github.com/facebook/docusaurus/discussions/6465 for more information.

Note that Docusaurus will automatically copy all of the contents under `static`
to the `public` directory.

### Optimisation

Prefer using `webp` format for all static and animated images.

Use these commands to convert to `webp`:

```sh
# This resizes to a maximum of 800px wide and sets the quality to 85
# This is useful for maintaining a consistent set of documentary images
gm convert -resize '800x>' -quality 85 ./x.jpg ./x.webp
```

This is important not only for Docusaurus but for reducing the size of images
being stored in the repository. Even with LFS, it's ideal to minimize the size
of images.

### Linking

In the navigation in Docusaurus, there are several properties that controls how
the routing works. Because `matrix.ai` is composed of separate cloudflare
workers stitched together into a single domain, we have to hack around client
side routing even for what looks like relative links.

```js
{
  to: 'pathname:///docs/',
  target: '_self'
}
```

The `to` ensures it shows up as a relative link.

The `pathname://` bypasses the client side routing forcing server side routing.

The `target: '_self'` ensures that the same frame is used instead of creating a
new frame.

## Deployment

Then you can build `npm run build`.

Finally run `npm run deploy`.

This will deploy the development workers first.

If you want to deploy production workers, you have to
`npm run deploy -- --env master`.
