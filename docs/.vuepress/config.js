const fs = require('fs')
const path = require('path')

const resolve = dir => path.resolve(__dirname,'../',dir)

const getFiles = path => fs.readdirSync(resolve(path)).map(file=>{
  if(file === 'README.md') return ''
  return file
}).sort()

module.exports = {
    title: 'Amyas\'s Blog.',
    themeConfig: {
        nav: [
            { text: '主页', link: '/' },
            { text: 'JavaScript', link: '/JavaScript/' },
            { text: 'TypeScript', link: '/TypeScript/' },
            { text: 'TODO', link: '/todo/' },
            { text: '笔记',
              items: [
                { text: '学习', link: '/study/' },
                { text: '记录', link: '/record/' }
              ]
            },
            { text: 'PHP', link: '/php/' },
            { text: '关于', link: '/about/' },
            { text: 'Github', link: 'https://www.github.com/amyas' },
        ],
        sidebar: {
            '/study/': getFiles('study'),
            '/record/': getFiles('record'),
            '/php/': getFiles('php'),
            '/JavaScript/': getFiles('JavaScript'),
            '/TypeScript/': getFiles('TypeScript'),
            '/Todo/': getFiles('todo')
            // // fallback
            // '/': [
            //   '',        /* / */
            //   'contact', /* /contact.html */
            //   'about'    /* /about.html */
            // ]
        },
        sidebarDepth: 5,
        lastUpdated: 'Last Updated', 
    }
}