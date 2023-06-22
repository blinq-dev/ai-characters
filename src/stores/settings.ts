import { ref, computed, Ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { ChatMessage } from '@/model/ChatMessage'

export const useSettingsStore = defineStore('settingsStore', () => {
    const model : Ref<string> = ref("gpt-3.5-turbo-0613")
    const smallModel : Ref<string> = ref("gpt-3.5-turbo-0613")
    const largeModel : Ref<string> = ref("gpt-3.5-turbo-16k")
    const apiKey : Ref<string|null> = ref(null)

    function saveSettings() {
        localStorage.setItem('settings', JSON.stringify({
            smallModel: smallModel.value,
            largeModel: largeModel.value,
            apiKey: apiKey.value
        }))
    }

    function loadSettings() {
        const settings = localStorage.getItem('settings')
        if (settings) {
            const parsed = JSON.parse(settings)
            model.value = parsed.smallModel
            smallModel.value = parsed.smallModel
            largeModel.value = parsed.largeModel
            apiKey.value = parsed.apiKey
        }
    }

    return { 
        model,
        smallModel,
        largeModel,
        apiKey,
        saveSettings,
        loadSettings
    }
})