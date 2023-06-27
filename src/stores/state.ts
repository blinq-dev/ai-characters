import { ref, computed, Ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { ChatMessage } from '@/model/ChatMessage'
import { drawRandomFace } from '@/helpers'

export const useStateStore = defineStore('stateStore', () => {
    const showGeneralSettings : Ref<boolean> = ref(false)

    const toggleGeneralSettings = () => {
        showGeneralSettings.value = !showGeneralSettings.value
    }


    return { 
        showGeneralSettings,

        toggleGeneralSettings
    }
})