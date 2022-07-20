# Less Reproduction

This is a reproduction repository for an issue I am having with `less-loader`, `babel-loader` and `webpack`. I am leaving it up so future visitors to the issue can access it. 

# Getting Set Up 

To get set up to work in this repo, simply run (from the root of the repo): 
```
npm install --legacy-peer-deps
``` 

Do not use Yarn, pnpm or Yak. 

Normally I don't commit .env files for obvious reasons, but I have here for the sake of simplicity (and since the contents aren't private per se, just configuration). 

# How To Start

To start a module, simply run:

```
npm run start -- --ModuleName
```

For this reproduction, that would be: 

```
npm run start -- --Test
```