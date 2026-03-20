# エージェント主導開発フロー 移行計画

## 現状の方針（確定済み）

- 開発環境へのデプロイは CDK 経由のみ
- トラブルシュート用に readonly な AWS_PROFILE でエージェントが自由に開発環境を参照
- 本番環境へのデプロイは CD 経由
- DynamoDB テーブル構造・UI は人間がレビュー
- フロントエンド: E2E テスト / バックエンド: ユニットテストで挙動を担保
- 目標: Issue に要件を書いて実装を完全にエージェントへ委任

## 未着手の優先課題

| 順位 | タスク | 理由 |
|------|-------|------|
| 1 | CD パイプライン構築 | 人間のデプロイ作業を排除し、エージェントのサイクルを完結させる |
| 2 | クリティカルパスの E2E テスト | AI の変更を自動検証する最も信頼できる防衛線 |
| 3 | CI の多層ゲート化 | マージの安全性を保証 |
| 4 | Issue テンプレート（BDD 形式） | エージェントへの指示品質向上 |
| 5 | CLAUDE.md / cdk-nag の整備 | エージェントのコンテキスト強化 |

## CD パイプライン推奨構成

```
PR マージ
  → CDK diff の自動表示
  → 承認
  → cdk deploy
  → 段階的ロールアウト（dev → staging → prod）
```

- CDK diff の影響範囲が大きい場合は自動でブロック

## CI 多層ゲート構成

```
リント → 静的解析 → ユニットテスト → E2E → セキュリティスキャン（cdk-nag / Checkov）→ 人間レビュー
```

全ゲート通過がマージの必須条件。

## E2E テスト方針

- **ビジネスクリティカルなフローを先に書く**（全網羅は不要）
- E2E テストは**人間が書く**（AI 生成テストのミューテーションスコアは約 20% で信頼性が低い）
- ユニットテストはエージェントに委任可（ただしミューテーションテストで品質検証）

## Issue の書き方（Spec-Driven Development）

- 受け入れ基準を **BDD 形式** (Given/When/Then) で記述
- 実装方法ではなく「何を達成したいか」を記述
- これがエージェントへの完了条件となり、スコープクリープを防止

## CLAUDE.md に書くべき内容

- コード規約・禁止パターン
- テスト手順（どこでどのテストを実行するか）
- CDK デプロイの手順と制約
- DynamoDB テーブル構造変更時のレビュー要求

## 目標フロー（完成形）

```
Issue（BDD 形式の受け入れ基準）
  → エージェントが実装・PR 作成
  → CI 多層ゲート通過
  → 人間レビュー（必要な箇所のみ）
  → マージ
  → CD が自動デプロイ
```

## 参考

- [Spec-Driven Development (Thoughtworks)](https://www.thoughtworks.com/en-us/insights/blog/agile-engineering-practices/spec-driven-development-unpacking-2025-new-engineering-practices)
- [Claude Code GitHub Actions Docs](https://code.claude.com/docs/en/github-actions)
- [AWS IaC MCP Server (AWS Blog)](https://aws.amazon.com/blogs/devops/introducing-the-aws-infrastructure-as-code-mcp-server-ai-powered-cdk-and-cloudformation-assistance/)
- [Tests Are Everything in Agentic AI (DEV Community)](https://dev.to/htekdev/tests-are-everything-in-agentic-ai-building-devops-guardrails-for-ai-powered-development-2onl)
