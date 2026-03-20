# statusline

Claude Code のステータスラインスクリプト。JSON 入力を受け取り、tmux/zsh などのステータスラインに表示する文字列を出力する。

## ファイル構成

| ファイル | 役割 |
|---|---|
| `main.ts` | エントリポイント。stdin を読み込んで出力を生成する |
| `claude.ts` | 入力 JSON の型定義と `fromJSON` パーサー |
| `parts.ts` | 各パーツ（モデル名・コンテキスト・レートリミット）の描画ロジック |

## テスト実行

```bash
node --experimental-strip-types --test claude.test.ts parts.test.ts
```
