# Obsidian Metadata

This plugin will render the all metadata of the frontmatter.

In the settings tab, you can set the metadata orders,
and you can ignore the fields if you don't want to render.

## Custom build

build with `yarn`:

```bash
foo@bar:~/obsidian-metadata$ yarn install
foo@bar:~/obsidian-metadata$ yarn build
```

or build with `npm`:

```bash
foo@bar:~/obsidian-metadata$ npm install
foo@bar:~/obsidian-metadata$ npm run build
```

then, copy `dist/*` to your vault:

```bash
foo@bar:~/obsidian-metadata$ mkdir -p ${your_vault_path}/.obsidian/plugins/obsidian-metadata/
foo@bar:~/obsidian-metadata$ copy dist/* ${your_vault_path}/.obsidian/plugins/obsidian-metadata/
```

finally, enable the plugin `Obsidian Metadata`.

## Maintainers

[@hypc](https://github.com/hypc)

## License

[MIT](https://github.com/hypc/obsidian-metadata/blob/master/LICENSE) © hypc
