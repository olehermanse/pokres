# PokRes

## Website

Pokémon stat calculators and resource files:

https://pokres.oleherman.com

**Note:** Only the encounter calculator is implemented and working.
The 2 bottom rows (IV/DV and EV) are not yet done.

## Run locally

The index.html is self contained, and committed to git, you can just open it in a browser, if you want.

With docker:

```
docker build --tag pokres . && docker run -it -p 8000:80 --name pokres --rm pokres
```

Or podman:

```
podman build --tag pokres . && docker run -it -p 8000:80 --name pokres --rm pokres
```

Open the app in your browser:

http://127.0.0.1:8000

## Build

After making changes to code, run this to generate a new index.html:

```
npm install && npm run build
```

## Generate resource files

Resource files are committed so this is normally not necessary:

```
python3 scripts/download-and-generate.py
```

Force redownload:

```
rm -rf res
python3 scripts/download-and-generate.py
```

## License / Copyright

See LICENSE.txt for full license.
