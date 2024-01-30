import Root from './__library'

Root.create(document.getElementById('root')!).render({
    importCallback: (feature) => import(`./${feature}/index.tsx`),
})
