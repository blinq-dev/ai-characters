import { ref, computed, Ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { ChatMessage } from '@/model/ChatMessage'

export const useChatStore = defineStore('chatStore', () => {
    const messages: Ref<Array<ChatMessage>> = ref([])
    const overlayIsShown: Ref<boolean> = ref(false)

    const addMessage = (msg: ChatMessage): ChatMessage => {
        messages.value.push(msg)

        return msg
    }

    const deleteMessage = (msg: ChatMessage) => {
        if (confirm('Are you sure you want to delete this message?')) {
            messages.value = messages.value.filter((m) => m !== msg)
        }
    }

    const messagesSinceCheckpoint = computed(() => {
        let checkpoints = messages.value.filter((msg) => msg.name === 'SUMMARY' && msg.getContentWeirdBug().trim());
        let lastCheckpoint = checkpoints[checkpoints.length - 1]

        if (!lastCheckpoint) {
            return messages.value
        }

        let index = messages.value.indexOf(lastCheckpoint)

        // Get two messages before the lastCheckpoint if possible
        index = index <= 1 ? index : index - 1
        index = index <= 1 ? index : index - 1

        return messages.value.slice(index)
    })

    const toggleOverlay = () => {
        overlayIsShown.value = !overlayIsShown.value
    }

    const chatLog = computed(() => {
        return messages.value.map(x => `${x.name} (${x.role}): ${x.getContentWeirdBug()}`).join('\n------------\n')
    })
    const chatLogSinceCheckpoint = computed(() => {
        return messagesSinceCheckpoint.value.map(x => `${x.name} (${x.role}): ${x.getContentWeirdBug()}`).join('\n------------\n')
    })


    function loadMessagesFromLocalStorage(characterSlug: string) {
        // load messages from localStorage
        messages.value = []
        const messagesFromLocalStorage = localStorage.getItem('messages.' + characterSlug)
        if (messagesFromLocalStorage) {
            try {
                let messagesFromLocalStorageParsed = JSON.parse(messagesFromLocalStorage)
                for (const msg of messagesFromLocalStorageParsed) {
                    messages.value.push(new ChatMessage(msg.content, msg.name, msg.role))
                }
            } catch (e) {
                console.error(e)
            }
        }
    }

    const saveMessages = (characterSlug: string) => {
        localStorage.setItem('messages.' + characterSlug, JSON.stringify(messages.value))
    }

    const clearMessages = (characterSlug: string) => {
        messages.value = []
        localStorage.removeItem('messages.' + characterSlug)
    }

    const estimatedTokenCount = computed(() => {
        let count = 0
        for (const msg of messagesSinceCheckpoint.value) {
            count += msg.getContentWeirdBug().length
        }
        return Math.floor(count / 4)
    })

    return { 
        messages, 
        addMessage, 
        deleteMessage,
        saveMessages, 
        clearMessages,
        overlayIsShown, 
        messagesSinceCheckpoint, 
        estimatedTokenCount,
        loadMessagesFromLocalStorage,
        toggleOverlay, 
        chatLog, 
        chatLogSinceCheckpoint,
    }
})