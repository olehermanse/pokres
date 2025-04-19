# Pokres

## Website

Pokémon stat calculators and resource files:

https://olehermanse.github.io/pokres/

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
