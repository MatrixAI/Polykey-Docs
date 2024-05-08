# Polykey-Docs

staging:[![pipeline status](https://gitlab.com/MatrixAI/open-source/Polykey-Docs/badges/staging/pipeline.svg)](https://gitlab.com/MatrixAI/open-source/Polykey-Docs/commits/staging)
master:[![pipeline status](https://gitlab.com/MatrixAI/open-source/Polykey-Docs/badges/master/pipeline.svg)](https://gitlab.com/MatrixAI/open-source/Polykey-Docs/commits/master)

Documentation for Polykey. This is mirrored to Gitlab at https://gitlab.com/MatrixAI/open-source/Polykey-Docs.

GitLab builds it via the CI/CD into static pages, rendering the markdown files and templates it within the branding of [polykey.com](https://polykey.com).

The CI/CD pushes it to [polykey.com/docs](https://polykey.com/docs) which is hosted by Cloudflare's pages and worker system.

## Development

Run `nix-shell`, and once you're inside, you can use:

```sh
# starts a local version
npm run start
# build the the static site
npm run build
# deploy to cloudflare
npm run deploy
# lint the source code
npm run lint
# automatically fix the source
npm run lintfix
```

You need to do setup the `.env` from `.env.example` if you want to successfully deploy to Cloudflare.

We use Git LFS to store all media in `images/**`. It's important to ensure that `git-lfs` is installed on your system before you contribute anything (on NixOS, it is installed as a separate package to `git`). By default anything put under `images/**` when using `git add` (after LFS is setup) will be uploaded to LFS, and thus the repository will only have links. Because LFS is enabled, it is used on both GitHub and GitLab.

If this is the first time you cloned the repository, you must use `git lfs install` to ensure your local repository has LFS setup. It may be automatically setup if you already had it installed prior to cloning.

Pro-tip, if we need to make sure files that were accidentally not put into LFS must be put into LFS, the command to use is:

```sh
git lfs migrate import --include="images/**" --everything
git lfs migrate import --include="files/**" --everything
```

Sometimes when you change branches, certain LFS references may not yet be resolved, in those cases you should just use (such as doing a `git lfs migrate import`):

```sh
git lfs pull
```

## Contributing

Because we use docusaurus, we can choose to write in markdown, TSX or MDX.

### HTML Syntax

Sometimes markdown syntax just doesn't cut it, and HTML syntax needs to be used.

While `docusaurus` is flexible, GitHub/GitLab is not.

GitHub/GitLab will process the markdown and then sanitizes the HTML: https://github.com/github/markup#github-markup.

There is a limited set of HTML tags are here: https://github.com/gjtorikian/html-pipeline/blob/03ae30d713199c2562951d627b98b75dc16939e4/lib/html/pipeline/sanitization_filter.rb#L40-L49

Furthermore not all attributes are kept. The `style` attribute for example is filtered out.

The most common styling attributes to be used will most likely be `align`, `width`, and `height`. See:  https://davidwells.io/snippets/how-to-align-images-in-markdown

### Linking Assets (files, images)

Markdown supports 2 ways of referencing images:

```md
![](/images/foobar.png)
<img src="/images/foobar.png" />
```

The former is markdown syntax, the latter is HTML tag.

In order to maintain portability, we always use absolute paths. This works on both GitHub/GitLab markdown rendering and also for `docusaurus`.

On GitHub/GitLab, which renders the markdown directly, the relative paths are considered relative to the location of the markdown file referencing the path. The absolute paths are considered relative to the root of the project repository. Therefore because `images` directory is located at the project root, it ends up being routable.

With `docusaurus`, the absolute paths are looked up relative to `static` directory. Inside the `static` directory we have created symlinks pointing back to `../images`. This allows `docusaurus` to also resolve these paths which will be copied into the `/build/` directory.

Note that `docusaurus` doesn't do any special rendering for HTML tags, it uses the `src` as is. While markdown references will be further processed with webpack. It is therefore preferable to use markdown syntax instead. The `docusaurus` does support a variant of the HTML tag:

```md
<img src={require('/images/foobar.png').default} />
```

However this does not work in GitHub/GitLab. So this is not recommended to use.

Therefore if you want to add inline styles to an image and still use markdown syntax so you get the benefit of `docusaurus` asset processing, the styles must be applied outside the image reference in a surrounding tag:

```md
<div align="center">

  ![](/images/foobar.png)

</div>
```

Take note of the whitespace newlines between, if no newlines are used, GitHub/GitLab will interpret this as all HTML. Also note that `<p></p>` will not work.

Note that this won't work for resizing the images unfortunately. You have to apply the `width` attribute directly to the `<img />` tag. See: https://github.com/facebook/docusaurus/discussions/6465 for more information.

### Linking

In the navigation in Docusaurus, there are several properties that controls how the routing works. Because `polykey.com` is composed of separate cloudflare workers stitched together into a single domain, we have to hack around client side routing even for what looks like relative links.

```js
{
  to: 'pathname:///docs/',
  target: '_self'
}
```

The `to` ensures it shows up as a relative link.

The `pathname://` bypasses the client side routing forcing server side routing.

The `target: '_self'` ensures that the same frame is used instead of creating a new frame.

## Deployment

You need to setup `.env` from `.env.example`.

Then you can build `npm run build`.

Finally run `npm run deploy`.

This will deploy the development workers first.

If you want to deploy production workers, you have to `npm run deploy -- --env production`.
