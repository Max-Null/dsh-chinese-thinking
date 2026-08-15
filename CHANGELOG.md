# Changelog

本项目遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/) 与[语义化版本](https://semver.org/lang/zh-CN/)。

## [0.2.0] - 2026-08-15

### Changed

- `order` 从 `150`（工具指引段）提前到 `-90`（persona 之前），让中文指令成为每轮最先读到的行为指令，提升首轮即用中文思考的概率。

## [0.1.1] - 2026-08-15

### Added

- 补充发现标签（`dsh-plugin`）与 bundle patch（`cordis.patch.yml`）。

### Fixed

- 通过 `publishConfig.access: public` 将 scoped 包标记为公开。

## [0.1.0] - 2026-08-15

### Added

- 首个版本：注入一条固定 system-prompt section，让 agent 始终用中文思考和回复。
