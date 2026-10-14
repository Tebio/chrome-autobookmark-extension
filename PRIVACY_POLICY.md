# AutoBookmark 智能书签栏 — 隐私政策

**生效日期：** 2026 年 10 月 14 日  
**维护者：** [Tebio](https://github.com/Tebio)  
**仓库地址：** [https://github.com/Tebio/chrome-autobookmark-extension](https://github.com/Tebio/chrome-autobookmark-extension)

---

## 概述

AutoBookmark 智能书签栏（以下简称「本扩展」）是由 Tebio 维护的开源浏览器扩展。我们尊重用户隐私，本隐私政策说明本扩展处理数据的方式。

---

## 数据收集与使用

**本扩展不收集、不存储、不传输、不出售任何个人信息或浏览活动。**

- **书签权限（`bookmarks`）**  
  本扩展仅在本地读取浏览器书签，用于在悬浮书签栏中展示和搜索。书签标题、网址、文件夹结构 **不会离开您的设备**。

- **存储权限（`storage`）**  
  仅通过浏览器本地存储 API（`chrome.storage.sync` / `chrome.storage.local`）保存您的个人偏好设置，例如触发距离、隐藏延迟、主题、停靠位置等。不涉及任何外部服务器。

- **活动标签页权限（`activeTab`）**  
  仅用于在当前网页与扩展之间通信，以显示或切换书签栏的固定状态。

- **图标权限（`favicon`）**  
  仅用于在本地获取并显示网站小图标，不会上传任何请求信息。

- **全 URL 权限（`host_permissions: <all_urls>`）**  
  仅用于在普通网页中注入悬浮书签栏，不读取或传输任何页面内容。

---

## 第三方服务

本扩展不使用任何分析工具、跟踪 Cookie、广告网络或第三方遥测服务。所有书签查找与搜索过滤均 100% 在本地完成。

---

## 联系我们

如有关于本隐私政策的疑问，欢迎通过以下方式联系：

- **GitHub Issues**：[https://github.com/Tebio/chrome-autobookmark-extension/issues](https://github.com/Tebio/chrome-autobookmark-extension/issues)
- **Fork 仓库**：[https://github.com/Tebio/chrome-autobookmark-extension](https://github.com/Tebio/chrome-autobookmark-extension)
