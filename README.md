# TP-Games Template

When building make sure to set an environment variable for BASE_URL
For example for the CTF deployment it is: BASE_URL=https://ctf-game.pages.dev

## Quality checks

Run the non-mutating checks before opening a pull request:

```sh
yarn lint:check
yarn build
```

Use `yarn lint` to apply Prettier formatting and ESLint autofixes.
