import sys
from urlparse import urljoin
from datetime import datetime
from flask import Flask, render_template, request
from flask_flatpages import FlatPages
from flask_frozen import Freezer
from werkzeug.contrib.atom import AtomFeed
from flatpandoc import FlatPagesPandoc
import subprocess as proc
try:
    import config
except ImportError, e:
    print("Please run install.py first.")
    raise e

DEBUG = True
FLATPAGES_AUTO_RELOAD = DEBUG
FLATPAGES_EXTENSION = '.md'
FREEZER_REMOVE_EXTRA_FILES = False

athena = Flask(__name__)
athena.config.from_object(__name__)
pages = FlatPages(athena)
freezer = Freezer(athena)
athena.jinja_env.comment_start_string = "{##}"
FlatPagesPandoc("markdown+raw_tex+yaml_metadata_block",
                athena, pre_render=True)
body_pages = [page for page in pages
              if page["title"] not in config.config["headerpages"]]


def make_external(url):
    return urljoin(request.url_root, url)


@athena.route("/feed.atom")
def recent_feed():
    feed = AtomFeed(config.config["title"],
                    feed_url=request.url_root,
                    url=request.url_root,
                    subtitle=config.config["title"] + " Atom Feed")

    for page in body_pages:
        feed.add(page["title"],
                 unicode(page.__html__()),
                 content_type='html',
                 url=make_external("/posts/"+page.path),
                 author=config.config["author"],
                 updated=datetime.combine(page["date"], datetime.min.time()),
                 published=datetime.combine(page["date"], datetime.min.time()))

    return feed.get_response()


@athena.route("/")
def index():
    return render_template("index.html", pages=body_pages, config=config.config)


@athena.route("/about/")
def about():
    page = pages.get_or_404("about")
    return render_template("about.html", page=page, config=config.config)


@athena.route("/posts/<path:path>/")
def page(path):
    page = pages.get_or_404(path)
    return render_template("page.html", page=page, config=config.config)

if __name__ == "__main__":
    proc.call("./managebib")
    if len(sys.argv) > 1 and sys.argv[1] == "build":
        freezer.freeze()
    else:
        athena.run(port=5000)
