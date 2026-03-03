# Send & Archive (Thunderbird Add-on)

This add-on adds a **Send & Archive** action to Thunderbird compose windows.

## Behavior

- Shows a `Send & Archive` button in the compose toolbar.
- Adds the shortcut `Ctrl+Shift+Enter`.
- Works for reply, reply-all, and forward compose windows.
- Archives the original message **only after send succeeds**.

## Disclaimer and support

- This extension was created by me for personal use only.
- It is **not officially supported**.
- It will only be updated when I personally see a need.
- Everyone is welcome to contribute if they want.

## Development notes

- The add-on reads `relatedMessageId` from compose details.
- It calls `compose.sendMessage(...)` first.
- Only if sending resolves successfully does it call `messages.archive(...)`.

## Releases

- Releases follow semantic versioning (`MAJOR.MINOR.PATCH`).
- Release commit messages follow semantic-release style (Conventional Commits), for example: `chore(release): 1.0.2`.

## Build/package

Create an installable `.xpi` automatically:

```bash
./scripts/package.sh
```

This produces a file in `dist/` named from the manifest version, for example:

- `dist/send-and-archive-1.0.2.xpi`

## Install in Thunderbird

1. Open Thunderbird.
2. Go to **Add-ons and Themes**.
3. Click the gear menu and choose **Install Add-on From File...**.
4. Select the generated `.xpi` file from `dist/`.

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE).
