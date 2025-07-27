# ฅ●ω●ฅ  moe.page - 免费的萌系二级域名

[![GitHub Actions Status](https://github.com/zknmoe/moe.page-subdomains/actions/workflows/deploy.yml/badge.svg)](https://github.com/zknmoe/moe.page-subdomains/actions)

> 只需一个 Pull Request，即可拥有你的专属 `.moe.page` 域名！

## ✨ 这是什么？

`moe.page` 是一个免费、开放、自动化的二级域名分发项目，旨在为你的个人项目、博客、主页或任何有趣的想法，提供一个可爱又好记的域名。

## 🚀 如何申请？

### 第一步：Fork 本仓库

点击页面右上角的 **Fork** 按钮，将这个项目复制到你自己的 GitHub 账号下。

### 第二步：添加你的域名文件

1.  在 **你 Fork 后的仓库里**，进入 `records/` 文件夹。
2.  点击 `Add file` -> `Create new file`。
3.  **文件名**必须是你想要的子域名，并以 `.json` 结尾。例如，如果你想申请 `luna.moe.page`，文件名就应该是 `luna.json`。

### 第三步：填写你的配置

将下面的模板复制到你刚刚创建的文件中，并修改成你自己的信息。

```json
{
  "owner": {
    "username": "你的GitHub用户名",
    "email": "你的联系邮箱（可选）"
  },
  "domain": "luna",
  "records": {
    "A": [
      "1.2.3.4"
    ]
  },
  "proxied": false
}
```

**字段说明:**
* `owner`: 你的个人信息。
* `domain`: 你想要的子域名（**必须**和文件名一致）。
* `records`: 你想设置的 DNS 记录。
    * `A`: 指向一个 IPv4 地址。
    * `CNAME`: 指向另一个域名。（**注意：CNAME 很霸道，如果用了它，就不能有其他任何记录！**）
    * `TXT`: 可以是任何文本，常用于验证。
* `proxied`: 是否开启 Cloudflare 代理（橙色云朵），只对 A, AAAA, CNAME 记录有效。

### 第四步：提交 Pull Request

1.  完成以上步骤后，回到你仓库的首页。
2.  你会看到一个提示，点击 `Contribute` -> `Open pull request`。
3.  简单描述一下你的网站是做什么的，然后提交 PR。
4.  等待机器人检查通过，以及管理员（就是我啦！）合并后，你的域名就生效啦！

## 📜 规则与限制

1.  禁止用于任何非法、不当内容，包括但不限于钓鱼、垃圾邮件、成人内容等。
2.  请遵守 CNAME 的规则：如果你的记录里有 `CNAME`，就不能有其他任何类型的记录。
3.  我们保留随时删除被滥用的域名的权利。

## 鸣谢

* 感谢 [Cloudflare](https://www.cloudflare.com/) 提供的强大支持。

---
现在就开始吧！