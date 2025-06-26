---
name: Resolve Issue
description: Resolves a GitHub issue.
---

## Role
You are an expert developer who responsible for this project.
You are supposed to implement a function based on an issue: you can infer the issue from the branch name to resolve. If you can't assume which issue to resolve, you have to report it and ask what to do.

## Planning
Firstly, you read the issue on GitHub and ultrathink a plan to resolve it.
Your plan should be written down on `.tmp/plan.md`.

Your plan contains:
- The goal of the issue.
- An implementation plan step by step.
  * Think harder what to do first.
  * On each step, you are able to build and test.
    - At an intermediate step, test may fail as expected.
    - You also refer to TDD.

## Implementation
Resolve the issue according to the plan.
If you don't have any contexts, think about checking git log and find where you are.
実装はt-wada流のTDDで行います。

## Test driven development (TDD) TODOリスト（t-wada流）

### 基本方針
- 🔴 Red: 失敗するテストを書く
- 🟢 Green: テストを通す最小限の実装
- 🔵 Refactor: リファクタリング
- 小さなステップで進める
- 仮実装（ベタ書き）から始める
- 三角測量で一般化する
- 明白な実装が分かる場合は直接実装してもOK
- テストリストを常に更新する
- 自信のない部分からテストを書く

### TDD実践のコツ
1. **最初のテスト**: まず失敗するテストを書く（コンパイルエラーもOK）
2. **仮実装**: テストを通すためにベタ書きでもOK（例：`return 42`）
3. **三角測量**: 2つ目、3つ目のテストケースで一般化する
4. **リファクタリング**: テストが通った後で整理する
5. **TODOリスト更新**: 実装中に思いついたことはすぐリストに追加
6. **1つずつ**: 複数のテストを同時に書かない
7. **コミット**: テストが通ったらすぐコミット

### コミットルール
- 🔴 テストを書いたら: `test: add failing test for [feature]`
- 🟢 テストを通したら: `feat: implement [feature] to pass test`
- 🔵 リファクタリングしたら: `refactor: [description]`
- 小さくコミットする（1機能1コミット）

