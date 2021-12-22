export default class MetadataProcessor {
    parseValues (values: string | string[] | any): string[] {
        if (['string', 'number'].indexOf(typeof values) > -1) {
            values = [values]
        }
        return values
    }

    generate (label: string, values: string | string[]): HTMLElement {
        values = this.parseValues(values)
        const el = document.createElement('div')
        el.setAttribute('class', 'frontmatter-section')

        const labelEl = document.createElement('span')
        labelEl.setAttribute('class', 'frontmatter-section-label')
        labelEl.innerText = label
        el.appendChild(labelEl)

        const valuesEl = document.createElement('div')
        valuesEl.setAttribute('class', 'frontmatter-section-value')
        values.forEach(value => {
            const valueEl = document.createElement('span')
            valueEl.setAttribute('class', 'frontmatter-value')
            valueEl.innerText = value
            valuesEl.appendChild(valueEl)
        })
        el.appendChild(valuesEl)

        return el
    }

    generateAliases (aliases: string | string[]): HTMLElement {
        aliases = this.parseValues(aliases)
        const el = document.createElement('div')
        el.setAttribute('class', 'frontmatter-section mod-aliases')

        const labelEl = document.createElement('span')
        labelEl.setAttribute('class', 'frontmatter-section-label')
        labelEl.innerText = 'Aliases'
        el.appendChild(labelEl)

        const aliasesEl = document.createElement('div')
        aliasesEl.setAttribute('class', 'frontmatter-section-aliases')
        aliases.forEach(alias => {
            const aliasEl = document.createElement('span')
            aliasEl.setAttribute('class', 'frontmatter-alias')
            aliasEl.innerText = alias
            aliasesEl.appendChild(aliasEl)
        })
        el.appendChild(aliasesEl)

        return el
    }

    generateTags (tags: string | string[]): HTMLElement {
        tags = this.parseValues(tags)
        const el = document.createElement('div')
        el.setAttribute('class', 'frontmatter-section mod-tags')

        const labelEl = document.createElement('span')
        labelEl.setAttribute('class', 'frontmatter-section-label')
        labelEl.innerText = 'Tags'
        el.appendChild(labelEl)

        const tagsEl = document.createElement('div')
        tagsEl.setAttribute('class', 'frontmatter-section-tags')
        tags.forEach(tag => {
            const tagEl = document.createElement('a')
            tagEl.setAttribute('class', 'tag')
            tagEl.setAttribute('target', '_blank')
            tagEl.setAttribute('rel', 'noopener')
            tagEl.setAttribute('href', `#${tag}`)
            tagEl.innerText = `#${tag}`
            tagsEl.appendChild(tagEl)
        })
        el.appendChild(tagsEl)

        return el
    }
}
