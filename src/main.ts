import { MarkdownPostProcessorContext, Plugin } from 'obsidian'
import MetadataProcessor from './processor'
import MetadataSettingTab, { DEFAULT_SETTINGS, MetadataSettings } from './settings'

export default class MetadataPlugin extends Plugin {
    settings: MetadataSettings
    processor: MetadataProcessor

    async onload () {
        await this.loadSettings()
        this.processor = new MetadataProcessor()
        this.addSettingTab(new MetadataSettingTab(this.app, this))
        this.registerMarkdownPostProcessor(this.frontmatterProcessor.bind(this))
    }

    async frontmatterProcessor (el: HTMLElement, ctx: MarkdownPostProcessorContext) {
        if (el.querySelector('.frontmatter')) {
            const container = el.querySelector('.frontmatter-container')
            container.querySelectorAll('.frontmatter-section').forEach(e => e.remove())
            const frontmatter = Object.assign({}, ctx.frontmatter)
            this.settings.ignores.forEach(field => {
                switch (field) {
                    case 'aliases':
                    case 'alias':
                        delete frontmatter['aliases']
                        delete frontmatter['alias']
                        break
                    case 'tags':
                    case 'tag':
                        delete frontmatter['tags']
                        delete frontmatter['tag']
                        break
                    default:
                        delete frontmatter[field]
                }
            })
            this.settings.orders.forEach(field => {
                const value = frontmatter[field]
                if (value !== undefined && value !== null && value !== '') {
                    delete frontmatter[field]
                    switch (field) {
                        case 'title':
                            container.appendChild(this.processor.generate('Title', value))
                            break
                        case 'aliases':
                        case 'alias':
                            delete frontmatter['aliases']
                            delete frontmatter['alias']
                            container.appendChild(this.processor.generateAliases(value))
                            break
                        case 'tags':
                        case 'tag':
                            delete frontmatter['tags']
                            delete frontmatter['tag']
                            container.appendChild(this.processor.generateTags(value))
                            break
                        case 'ctime':
                            container.appendChild(this.processor.generate('CTime', value))
                            break
                        case 'mtime':
                            container.appendChild(this.processor.generate('MTime', value))
                            break
                        default:
                            container.appendChild(this.processor.generate(this.titleCase(field), value))
                    }
                }
            })
            Object.keys(frontmatter).sort().forEach(field => {
                container.appendChild(this.processor.generate(this.titleCase(field), frontmatter[field]))
            })
        }
    }

    titleCase (text: string): string {
        return text
            .toLowerCase()
            .replace(/[-_. ]/g, ' ')
            .replace(/ +/g, ' ')
            .trim()
            .split(' ')
            .map(word => word[0].toUpperCase() + word.slice(1))
            .join(' ')
    }

    async loadSettings () {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
    }

    async saveSettings () {
        await this.saveData(this.settings)
    }

    onunload () {
    }
}
