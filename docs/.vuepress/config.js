const fs = require("fs");
const path = require("path");

const resolve = (dir) => path.resolve(__dirname, "../", dir);

const getFiles = (path) =>
  fs
    .readdirSync(resolve(path))
    .map((file) => {
      if (file === "README.md") return "";
      return file;
    })
    .sort();

module.exports = {
  title: "Amyas's Blog.",
  themeConfig: {
    nav: [
      { text: "主页", link: "/" },
      {
        text: "JavaScript",
        items: [
          { text: "理论", link: "/js-theory/" },
          { text: "实践", link: "/js-practice/" },
        ],
      },
      { text: "PHP", link: "/php/" },
      { text: "关于", link: "/about/" },
      { text: "Github", link: "https://www.github.com/amyas" },
    ],
    sidebar: {
      "/js-theory/": getFiles("js-theory"),
      "/js-practice/": getFiles("js-practice"),
      "/php/": getFiles("php"),
      // // fallback
      // '/': [
      //   '',        /* / */
      //   'contact', /* /contact.html */
      //   'about'    /* /about.html */
      // ]
    },
    sidebarDepth: 5,
    lastUpdated: "Last Updated",
  },
};
