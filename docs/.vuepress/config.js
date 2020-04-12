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
            // { text: 'JavaScript',
            //   items: [
            //     { text: '学习', link: '/study/' },
            //     { text: '记录', link: '/record/' }
            //   ]
            // },
            { text: 'PHP', link: '/php/' },
            { text: '关于', link: '/about/' },
            { text: 'Github', link: 'https://www.github.com/amyas' },
        ],
        sidebar: {
            '/study/': getFiles('study'),
            '/record/': getFiles('record'),
            '/php/': getFiles('php'),
            '/JavaScript/': getFiles('JavaScript')
            // // fallback
            // '/': [
            //   '',        /* / */
            //   'contact', /* /contact.html */
            //   'about'    /* /about.html */
            // ]
        },
        // sidebarDepth: 2,
        lastUpdated: 'Last Updated', 
    }
}