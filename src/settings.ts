import { App, PluginSettingTab, Setting } from 'obsidian'
import MetadataPlugin from './main'

export interface MetadataSettings {
    orders: string[]
    ignores: string[]
}

export const DEFAULT_SETTINGS: MetadataSettings = {
    orders: ['title', 'aliases', 'tags', 'ctime', 'mtime'],
    ignores: []
}

export default class MetadataSettingTab extends PluginSettingTab {
    plugin: MetadataPlugin

    constructor (app: App, plugin: MetadataPlugin) {
        super(app, plugin)
        this.plugin = plugin
    }

    async display () {
        const { containerEl, plugin } = this
        containerEl.empty()
        containerEl.createEl('h2', { text: 'Metadata Settings' })

        new Setting(containerEl)
            .setName('Metadata Fields Orders')
            .setDesc('')
            .addTextArea(area => area
                .setPlaceholder(DEFAULT_SETTINGS.orders.join('\n'))
                .setValue(plugin.settings.orders.join('\n'))
                .onChange(async value => {
                    plugin.settings.orders = value.trim().split('\n').map(v => v.trim())
                    await plugin.saveSettings()
                }))

        new Setting(containerEl)
            .setName('Metadata Ignore Fields')
            .addTextArea(area => area
                .setValue(plugin.settings.ignores.join('\n'))
                .onChange(async value => {
                    plugin.settings.ignores = value.trim().split('\n').map(v => v.trim())
                    await plugin.saveSettings()
                }))
    }
}
