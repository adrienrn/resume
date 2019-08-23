# resume

A little personal project to author a kick-ass resume in HTML or PDF.

![PDF resume preview](https://raw.githubusercontent.com/adrienrn/resume/dev/screenshot.jpg)

Most of the work is leveraged by [hacksalot/HackMyResume](https://github.com/hacksalot/HackMyResume), kudos to him.

This project contains my resume as a .json file (FRESH resume) aggremented with tools to help develop and release:

- Dockerized HackMyResume
- Custom FRESH theme, called `henlo`
- Puppeteer to generate the PDFs -- see below why
- BrowserSync to serve the HTML/CSS and live reload
- Gulp to watch files and rebuild, refresh while developing

With a little work, it could become useful as starter-pack/example maybe?

## Get started

The first time, you probably just want to start the container.

```
~$ docker-compose up
```

There, you're done and go to `http://localhost:9000/base.html`.

Gulp is watching files and BrowserSync will live reload your page automatically. Any change to `.json`, `.html`, `.hbs` or `.css`, will trigger a rebuild of both the base.html and base.pdf output files (see `dist/` folder). Simple but realy handy while working on your content or design.

## Generate

```
~$  docker-compose run node /bin/bash -c 'yarn run hackmyresume:dist'
```

This will generate the final files:
- `/dist/resume.html`
- `/dist/resume.pdf`

Any files named `private-*.json` in the `src/` will be included in this type of build. I use it to have my contact informations private and not committed to this repository.

## FAQ

### Are you going to release the henlo theme?

🇫🇷 Oui, 🇩🇪 Ja, 🇷🇺 Da!

However, at the moment it only supports a handful of FRESH fields that I am using. 👹

### Why use Puppeteer?

Yes, HackMyResume can generate PDF resume. However:

- Features like Flexbox, CSS multi-columns layout and CSS Grid are [not supported by the vrsion of QtWebkit](http://trac.webkit.org/wiki/QtWebKitFeatures22) used by [wkhtmltopdf](https://wkhtmltopdf.org/) and [PhantomJS](https://phantomjs.org/)
- [WeasyPrint](https://github.com/Kozea/WeasyPrint) is awesome though, [the only thing missing was CSS Grid support that is still a work in progress](https://github.com/Kozea/WeasyPrint/issues/543), really cool project.
- [Puppeteer](https://github.com/GoogleChrome/puppeteer) in the other hand uses a headless chromium and has support for (all?) a lot of the latest CSS features!

You can find the a script, [provision.sh](https://github.com/adrienrn/resume/blob/dev/scripts/provision.sh), to install those 3 tools and test them. This should definitely go into the dockerfile but since I do not use them, I didn't include them in the container, yet.

### Why all the fuss in the Dockerfile?

I didn't have a Dockerfile before needing Puppeteer, and I was using a default node image.

However the documentation is great (error messages are nice too!) and everything is explained there:
- [Troubleshooting](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#running-puppeteer-in-docker)
- [Example](https://github.com/ebidel/try-puppeteer/tree/1ce29c6a2068bb824c59a71958af7b8607179fc4)

### Next steps?

- Move the theme into its own repository.
- Create another repository without my data, to offer dockerized and live reload as a "starter pack"; if you would find it useful, open an issue.
- Make a PR to [hacksalot/HackMyResume](https://github.com/hacksalot/HackMyResume) to include puppeteer support!
