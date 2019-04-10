# athena

**athena** is an elegant, minimalist, simple static blog generator
written in Python. It is based on Flask, Pandoc, and Tufte CSS.

![athena screenshot](/static/athena.png)

You can browse the [live demo here][demo].

## Why athena?

Because it is the simplest, yet aesthetically pure, static blog generator with
paramount focus on the reading experience. As a WordPress user since 2007, I
think it's time for a change. Other static blog generators are too feature
heavy and bloated. athena just works.

### Tufte CSS

Edward Tufte’s style is known for its simplicity, extensive use of sidenotes,
tight integration of graphics with text, and carefully chosen typography.
[More about ET][et].

## Install

Dependencies: `Python 3`, `pandoc`, `pandoc-citeproc`, `pandoc-crossref`,
`pandoc-sidenote`.

1. `git clone https://github.com/apas/athena.git`
1. `python3 install.py`

The install script will check for Python 3 and Pandoc dependencies, create
and activate an appropriate virtual environment, install the pip dependencies,
and finally prompt you to customize athena with a blog title and author, a
description for the home page and sidebar, and a footer caption like:

``` {.bash}
==> Customizing athena. . .
Enter title: Athena
Enter author: Apostolos Papadopoulos
Enter home page description: A description for the homepage with a navigation bar.
Enter sidebar description: A brief description for each post with a navigation bar.
Enter footer: Footer
```

Upon a successful installation, the script generates a `config.py` file which
contains the values you've entered when prompted and are shared between
the Python backend and the Jinja template engine.

## Usage

### Running athena

1. `./env/bin/python3 athena.py`

athena will start a Flask server at `127.0.0.1:5000`.

### Building static HTML

1. `./env/bin/python3 athena.py build`

A new `build/` directory will be created (it's automatically ignored by git.)
For subsequent builds, athena rebuilds only the updated files, rather than the
entire codebase.

For deploying athena to a remote server read the relevant section below.

### Post structure

athena supports two types of Markdown-to-HTML content: posts and pages.
`posts` are normal blog posts and `pages` are auxiliary to the blog pages such
as _About_ or _Contact_. Both are read from the `pages/` directory and are
subsequently built to static HTML files. The difference between a post and a
page is one YAML key.

**Posts**

Posts must start with the following YAML structure:

    ---
    title: Title of the post
    date: 2016-03-12
    description: A short description of the post.
    ...

Posts are accessible in the following endpoint: `/posts/<name-of-post>`

**Pages**

Pages must start with the following YAML structure:

    ---
    title: Title of the page
    date: 2017-11-14
    description: A sample about page.
    ispage: yes
    ...

Pages are accessible in the following endpoint: `/<name-of-page>`

For both posts and pages: title and date values are extracted for the index
loop and the post's permalink; the `ispage` value is filtered in the backend
in order to produce a list of posts and a list of pages for the nav and side
bars, as well as the Atom feed. Both author and description values are
used in the post's HTML meta tags and are optional. The name of the Markdown
file for either a post or a page can by anything and is its URL path.

For instance: \
`about.md` with `ispage: yes` will be available at `/about` \
`random.md` without `ispage` at all will be available at `/posts/random`

### Tufte CSS-specific elements

athena uses the beautiful Tufte CSS layout. Markdown is automatically rendered
to proper HTML and corresponding Tufte rules.

I highlight all relevant syntax in the [elements][elems] file. However, a
brief summary of the most frequent elements is provided below.

**Image**

    ![Hackers and painters; by Pieter Bruegel.]( {{
    url_for('static', filename='img/bruegel.jpg') }}){#fig:bruegel}

A relevant directory to host and serve from all your image assets is
`static/img`. The image caption is used as the image's margin note.

**Side note** (Numbered footnote in the right margin)

    Etiam ut arcu nec massa bibendum lobortis ac eu justo. Proin sit amet
    sagittis est. [^note]

    [^note]: A note.

**Margin note** (Unnumbered footnote in the right margin)

    They're not doing research per se, though if in the course of
    trying to make good things they discover some new technique, so much the
    better. [^mn]

    [^mn]:
      {-} This is a margin note. Notice there isn't a number preceding
      the note.

**Code**

You can write inline code by enclosing text in single backticks.
Alternatively, for blocks use three backticks. athena supports code
highlighting via Pygmentize. 

    ``` {.python}
    # a code block with syntax highlighting
    def hello():
        print "world"
    ```

**Table**

When including a table element align the first column to the left for maximum
Tufte enjoyment.

    | Tables   |      Are      |  Cool |
    |:---------|---------------|-------|
    | col 1 is |  left-aligned |  Foo  |
    : A demo table. {#tbl:demo}

**Bib citations**

Simply create a `.bib` file in the `/pages` directory for each post that
cites one or more references and populate it accordingly. At build time,
athena creates a new `all.bib` index out of all `.bib` files. Then, simply
reference your citation as you normally would:

    At one end you have people who are really mathematicians, but call
    what they're doing computer science so they can get
    DARPA grants. [@clark1988design]

For posts with citations, athena automatically appends the relevant
bibliography at the end of the post under a References header element.

**Math**

You can write inline math by enclosing text in single dollar signs.
Alternatively, for blocks use double dollar signs and a space. Math is
rendered via [MathML][mml].

    See [@eq:euler].

    $$ e^{i\pi} - 1 = 0 $$ {#eq:euler}

**Cross-references**

You might have observed that for image, table, and math references
athena also relies on `{#fig:xxx}` and `[@fig:xxx]` (`tbl` and `eq`
respectively) elements. These are optional and are used by `pandoc-crossref`
to automatically generate numbered captions and references in the generated
text. For the complete cross-reference documentation please visit the
`pandoc-crossref` [repository][pdcf].

### Atom feed

athena generates an Atom feed at the `/feed.atom` endpoint.

### Try as you write

Simply run athena as documented above. This allows you to test everything
locally before building to static HTML, committing, and deploying to your
remote server. If you're using Sublime Text I recommend installing the
LiveReload plugin for Safari or Google Chrome.

### Deploying athena

athena works out of the box with any server capable of serving HTML content.
If you do not want to pay for or own a server you can use GitHub Pages. It's
where the cool kids hang out nowadays, anyway.

If you're using your own hosting solution you know what to do now. Happy
blogging!

For GitHub pages you can `init` a new git repo from within the `/build`
directory since athena's ignoring it and `push` from there.

## License

MIT

[et]: https://en.wikipedia.org/wiki/Edward_Tufte
[demo]: https://apas.github.io/athena/
[elems]: https://raw.githubusercontent.com/apas/athena/pandoc/pages/elements.md
[mml]: https://www.w3.org/Math/whatIsMathML.html
[pdcf]: https://github.com/lierdakil/pandoc-crossref
