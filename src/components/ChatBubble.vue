<template>
    <div v-if="props.message.role != 'system'" class="flex flex-col w-10/12 md:w-3/4 lg:w-2/3 xl:w-5/12" :class="{
        'self-end rounded-br-none': props.message.side == 'right',
        'self-start rounded-bl-none': props.message.side == 'left',
    }">

        <div class="relative backdrop-blur-xl p-3 rounded-2xl text-white bg-[#434851]" :class="{
            'mr-1 md:mr-8 ': props.message.side == 'right',
            'ml-1 md:ml-8  ': props.message.side == 'left',
            'rounded-br-none': props.showUser && props.message.side == 'right',
            'rounded-bl-none': props.showUser && props.message.side == 'left',
        }" :style="{

        }">
            <div class="absolute w-full px-3 items-center -mt-10 uppercase left-0 text-white bold text-sm flex gap-3 opacity-0 hover:opacity-100 transition">
                <span v-if="props.message.isCheckpoint()">Checkpoint</span>
                <button  @click="startEdit"  class="uppercase opacity-20 hover:opacity-100">Edit</button>
                <button  @click="deleteEdit"  class="uppercase opacity-20 hover:opacity-100">Delete</button>
            </div>
            
            <span class="markdown" v-html="props.message.getHtmlContent()"></span>
        </div>

        <div v-if="showUser" class="text-white mb-4" :class="{
            'self-end': props.message.side == 'right',
        }">
            <div class="w-16 h-16 mt-3 rounded-3xl  flex items-center justify-center" :style="{ backgroundColor: props.message.side === 'left' ? '#a8d2fc' : characterStore.selectedCharacter.color }">
                <div class="" v-html="drawRandomFace(props.message.side === 'left' ? settingsStore.avatar : characterStore.selectedCharacter.avatar)" />
            </div>
        </div>
    </div>
    <div v-on-click-outside="cancelEdit" v-if="isEditing"
        class="fixed flex flex-col z-50 top-0 bottom-24 left-0 right-0 backdrop-brightness-90 backdrop-blur-3xl rounded-2xl text-white/80 p-5 m-10">
        <div class="overflow-scroll grow">
            <textarea class="w-full h-full bg-transparent" v-model="props.message.content"></textarea>
        </div>
        <div class="flex gap-2 mt-4 shrink-0">
            <button @click="saveEdit"
                class="backdrop-brightness-50 backdrop-blur-xl text-white rounded-lg p-2">Save</button>
            <button @click="deleteEdit" class="backdrop-brightness-50 backdrop-blur-xl text-white rounded-lg p-2">Delete
                message</button>
            <button @click="cancelEdit"
                class="backdrop-brightness-50 backdrop-blur-xl text-white rounded-lg p-2">Dismiss</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ChatMessage } from '@/model/ChatMessage';
import { useCharacterStore } from '@/stores/character';
import { useSettingsStore } from '@/stores/settings';
import { vOnClickOutside } from '@vueuse/components'
import { useChatStore } from '@/stores/chat';
import { ref } from 'vue';
import { drawRandomFace } from '@/helpers';

const chatStore = useChatStore()
const characterStore = useCharacterStore()
const settingsStore = useSettingsStore();
const isEditing = ref(false);

let msgBackup : string = "";

const cancelEdit = () => {
    isEditing.value = false
    props.message.setContentWeirdBug(msgBackup)
}

const startEdit = () => {
    isEditing.value = true;
    msgBackup = props.message.getContentWeirdBug();
}

const saveEdit = () => {
    chatStore.saveMessages(characterStore.selectedCharacter.botSlug)
    isEditing.value = false;
}

const deleteEdit = () => {
    chatStore.deleteMessage(props.message)
    chatStore.saveMessages(characterStore.selectedCharacter.botSlug)
    isEditing.value = false;
}

let props = defineProps<{
    message: ChatMessage,
    showUser: boolean,
}>();



</script>

<style></style>