import { ref, computed, Ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { ChatMessage } from '@/model/ChatMessage'
import { drawRandomFace } from '@/helpers'

export const useSettingsStore = defineStore('settingsStore', () => {
    const myName : Ref<string> = ref("User")
    const model : Ref<string> = ref("gpt-3.5-turbo-0613")
    const smallModel : Ref<string> = ref("gpt-3.5-turbo-0613")
    const largeModel : Ref<string> = ref("gpt-3.5-turbo-16k")
    const apiKey : Ref<string|null> = ref(null)
    const avatar : Ref<string|null> = ref(drawRandomFace())
    const color : Ref<string|null> = ref("#a8d2fc")

    function saveSettings() {
        localStorage.setItem('settings', JSON.stringify({
            smallModel: smallModel.value,
            largeModel: largeModel.value,
            myName: myName.value,
            apiKey: apiKey.value,
            avatar: avatar.value,
            color: color.value,
        }))
    }

    function loadSettings() {
        const settings = localStorage.getItem('settings')
        if (settings) {
            const parsed = JSON.parse(settings)
            model.value = parsed.smallModel
            myName.value = parsed.myName
            smallModel.value = parsed.smallModel
            largeModel.value = parsed.largeModel
            apiKey.value = parsed.apiKey
            avatar.value = parsed.avatar
            color.value = parsed.color
        }
    }

    return { 
        model,
        smallModel,
        largeModel,
        apiKey,
        saveSettings,
        loadSettings,
        myName,
        avatar,
        color
    }
})