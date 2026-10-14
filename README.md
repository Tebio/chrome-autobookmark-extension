# AutoBookmark 智能书签栏

> 一个智能、自动隐藏的悬浮书签栏，支持 Chrome、Edge、Firefox、Brave、Opera 等现代桌面浏览器。
> 本仓库为 [Tebio](https://github.com/Tebio) 基于原 AutoBookmark 项目的二次开发 / 汉化分支，已去除品牌推广内容，新增 **Edge 原生主题**，并针对触发卡顿、卡手问题进行了优化。

<div align="center">

[![GitHub Release](https://img.shields.io/github/v/release/Tebio/chrome-autobookmark-extension?style=for-the-badge&color=10B981)](https://github.com/Tebio/chrome-autobookmark-extension/releases/latest)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

<br/>

![AutoBookmark Banner](icons/icon128.png)

</div>

---

## 🌐 浏览器兼容性

AutoBookmark 智能书签栏基于 Manifest V3 构建，可在以下现代桌面浏览器中运行：

- ✅ Google Chrome
- ✅ Microsoft Edge
- ✅ Mozilla Firefox
- ✅ Opera & Opera GX
- ✅ Brave Browser
- ✅ Vivaldi
- ✅ Arc Browser

---

## ✨ 主要功能

- **⚡ 悬停即现**：将鼠标移到屏幕边缘（上 / 下 / 左 / 右）即可唤出书签栏。
- **🍃 平滑自动隐藏**：鼠标离开书签区域后自动平滑收回，不占用页面空间。
- **🧭 四向边缘停靠**：支持顶部、底部、左侧、右侧四种停靠方式；左右停靠时自动切换为竖向侧边栏。
- **➕ 一键收藏当前页**：点击书签栏上的“+”按钮，即可将当前标签页加入书签栏。
- **📂 文件夹批量打开**：中键点击文件夹或右键选择“全部在标签页中打开”，一次性打开文件夹内所有链接。
- **🔀 拖拽整理**：自由拖拽书签 / 文件夹进行排序，也可以把书签拖入文件夹。
- **🖱️ 右键菜单管理**：支持在新标签页打开、收藏当前页到此文件夹、编辑书签 / 重命名文件夹、删除书签 / 文件夹。
- **✏️ 原地编辑**：直接在书签栏中修改书签名称、网址或文件夹名称。
- **📁 多级文件夹**：无缝展开的子文件夹层级，方便浏览深层书签。
- **🔍 实时搜索**：在书签栏或弹出窗口中即时搜索书签。
- **📌 一键固定**：按 `Alt + B` 或点击固定按钮，让书签栏常驻显示。
- **🛡️ Shadow DOM 隔离**：使用开放的 Shadow DOM 注入页面，避免与网页 CSS 冲突。
- **🎨 5 款主题**：Edge 原生（默认）、深色玻璃、浅色、AMOLED 黑、经典 Chrome。
- **⚡ 隐私优先**：完全本地运行，不收集、不上传任何数据。

---

## 🎨 Edge 原生主题

新版默认主题采用贴近 Microsoft Edge 原生的配色：

- 书签栏背景：`#DDDFE2`
- 文字颜色：`#373839`
- 高亮 / 悬停颜色：Edge 风格蓝色 `#0B5CAD`

在扩展弹出窗口的「外观与位置」中即可一键切换。

---

## 📸 预览

### 1. 自动隐藏的悬浮书签栏

悬停唤出，离开自动隐藏，保留完整的网页阅读空间：

![悬浮书签栏](icons/screenshot2_1280x800.png)

### 2. 设置面板与主题

可自定义触发距离、自动隐藏延迟、固定快捷键 `Alt + B`，以及切换 5 款主题：

![设置与主题](icons/screenshot1_1280x800.png)

---

## 🚀 如何安装

### 方式一：从 GitHub Releases 下载（推荐，无需商店）

👉 **[下载最新 Release](https://github.com/Tebio/chrome-autobookmark-extension/releases/latest)**

#### 适用于 Chrome / Edge / Brave / Opera / Vivaldi（`AutoBookmark-v1.3.0.zip`）

1. 下载最新 Release 中的 `AutoBookmark-v1.3.0.zip`。
2. 将压缩包解压到本地文件夹。
3. 打开浏览器扩展管理页面：
   - Chrome：`chrome://extensions`
   - Edge：`edge://extensions`
   - Brave：`brave://extensions`
   - Opera：`opera://extensions`
4. 开启右上角「开发者模式」。
5. 点击「加载已解压的扩展程序」，选择刚才解压的文件夹。

#### 适用于 Mozilla Firefox（`AutoBookmark-firefox-v1.3.0.zip`）

1. 下载对应 Firefox 包。
2. 打开 Firefox 的 `about:debugging#/runtime/this-firefox`。
3. 点击「临时加载附加组件」，选择 zip 包或其 `manifest.json`。

---

## 💡 小贴士：隐藏浏览器默认书签栏

为了获得最沉浸的体验，建议关闭浏览器自带的静态书签栏，让 AutoBookmark 取而代之。

### 快捷键（所有浏览器）

Windows / Linux：`Ctrl + Shift + B`  
macOS：`Cmd + Shift + B`

### 各浏览器手动关闭

| 浏览器 | 操作 |
| :--- | :--- |
| Google Chrome | `⋮` > 书签和清单 > 取消勾选「显示书签栏」 |
| Microsoft Edge | `…` > 收藏夹 > 点击 `…` > 选择「隐藏收藏夹栏」>「从不」 |
| Mozilla Firefox | 右键标签栏空白处 > 书签工具栏 > 「永不显示」 |
| Opera / Opera GX | `Alt + P` > 搜索「书签」> 关闭「显示书签栏」 |
| Brave | `Ctrl + Shift + B` 或 设置 > 外观 > 关闭「显示书签栏」 |

---

## ⌨️ 快捷键

| 快捷键 | 动作 |
| :--- | :--- |
| `Alt + B` | 显示 / 固定悬浮书签栏 |

---

## ⚙️ 扩展设置

点击浏览器工具栏中的 AutoBookmark 图标即可设置：

- **触发距离**：2px ~ 25px，控制鼠标离边缘多远时触发显示。
- **自动隐藏延迟**：100ms ~ 1500ms，控制离开后多久隐藏。
- **外观主题**：Edge 原生、深色玻璃、浅色、AMOLED 黑、经典 Chrome。
- **停靠位置**：顶部、底部、左侧、右侧。
- **行为**：在新标签页 / 当前页打开书签、显示网站图标、悬停显示书签网址。

---

## 🛠️ 技术栈

- **Manifest V3**：现代扩展标准，使用 Service Worker 与声明式存储。
- **Shadow DOM**：完整样式与布局隔离，避免影响宿主网页。
- **原生浏览器 API**：`chrome.bookmarks`、`chrome.storage.sync`、`chrome.commands`。

---

## ⚡ 本分支主要改动

### v1.3.0

- **🌏 全面汉化**：所有界面文案（弹出窗口、右键菜单、模态框、Toast、工具提示等）均已转为简体中文。
- **🚫 去除广告与品牌推广**：移除上游版本中的品牌按钮、开发者卡片、页脚链接及品牌图标资源。
- **🎨 新增 Edge 原生主题**：默认采用 Edge 风格配色（背景 `#DDDFE2` / 文字 `#373839`）。
- **🚀 触发性能优化**：
  - 使用 `requestAnimationFrame` 节流全局 `mousemove`，降低 CPU 占用。
  - 避免每次鼠标移动都重置隐藏定时器。
  - 显示后增加宽限期，防止快速滑过时立即隐藏。
  - 搜索输入防抖并丢弃过期响应。
  - 拖拽期间延迟书签重渲染，拖拽结束后再刷新，避免卡顿。
- **🔗 更新源指向本 Fork**：版本检查与下载链接均指向 `Tebio/chrome-autobookmark-extension`。

---

## 🗺️ 路线图

详见 [ROADMAP.md](ROADMAP.md)。

---

## 📄 隐私政策

详见 [PRIVACY_POLICY.md](PRIVACY_POLICY.md)。

---

## 📦 更新日志

### v1.3.0（当前版本）

- 全面汉化、去除广告、新增 Edge 原生主题、优化触发卡顿与卡手问题。

### v1.2.0

- 支持四向边缘停靠与竖向侧边栏模式。
- 支持拖拽排序、文件夹批量打开、右键菜单管理。

### v1.1.0

- 新增书签编辑 / 文件夹重命名、删除确认、多级子文件夹。

### v1.0.0

- 初始版本：自动隐藏悬浮书签栏、Shadow DOM 隔离、多主题、跨浏览器支持。

---

## 📄 许可证

MIT License。开源且免费使用。
