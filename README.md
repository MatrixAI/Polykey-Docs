# Polykey-Docs

Documentation for Polykey. This uses GitHub wiki as a CMS. This wiki is mirrored to Gitlab at https://gitlab.com/MatrixAI/open-source/Polykey-Docs.

GitLab builds the wiki via the CI/CD into static pages, rendering the markdown files and templates it within the branding of [polykey.io](https://polykey.io).

The CI/CD pushes it to [polykey.io/docs](https://polykey.io/docs) which is hosted by Cloudflare's pages and worker system.

## Contributing

### HTML Syntax

Sometimes markdown syntax just doesn't cut it, and HTML syntax needs to be used.

While `docusaurus` is flexible, GitHub is not.

GitHub will process the markdown and then sanitizes the HTML: https://github.com/github/markup#github-markup.

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

In order to maintain portability, we always use absolute paths. This works on both GitHub markdown rendering and also for `docusaurus`.

On GitHub, which renders the markdown directly, the relative paths are considered relative to the location of the markdown file referencing the path. The absolute paths are considered relative to the root of the project repository. Therefore because `images` directory is located at the project root, it ends up being routable.

With `docusaurus`, the absolute paths are looked up relative to `static` directory. Inside the `static` directory we have created symlinks pointing back to `../images`. This allows `docusaurus` to also resolve these paths which will be copied into the `/build/` directory.

Note that `docusaurus` doesn't do any special rendering for HTML tags, it uses the `src` as is. While markdown references will be further processed with webpack. It is therefore preferable to use markdown syntax instead. The `docusaurus` does support a variant of the HTML tag:

```md
<img src={require('/images/foobar.png').default} />
```

However this does not work in GitHub. So this is not recommended to use.

Therefore if you want to add inline styles to an image and still use markdown syntax so you get the benefit of `docusaurus` asset processing, the styles must be applied outside the image reference in a surrounding tag:

```ms
<div align="center">

  ![](/images/foobar.png)

</div>
```

Take note of the whitespace newlines between, if no newlines are used, GitHub will interpret this as all HTML. Also note that `<p></p>` will not work.

Note that this won't work for resizing the images unfortunately. You have to apply the `width` attribute directly to the `<img />` tag. See: https://github.com/facebook/docusaurus/discussions/6465 for more information.
