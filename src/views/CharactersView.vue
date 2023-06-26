<script setup lang="ts">
  import { drawRandomFace } from '@/helpers';
import { Character } from '@/model/Character';
import { ChatMessage } from '@/model/ChatMessage';
import { useCharacterStore } from '@/stores/character';
import { useChatStore } from '@/stores/chat';
import { useSettingsStore } from '@/stores/settings';
import { nanoid } from 'nanoid';

  let characterStore = useCharacterStore();
  let chatStore = useChatStore();
  let settingsStore = useSettingsStore();

  async function exportAllToClipboardJson() {

    const exp = {
      characters: localStorage.getItem('characters'),
      settings: localStorage.getItem('settings'),
      messages: characterStore.characters.map(x => ({
        key: 'messages.' + x.botSlug,
        messages: localStorage.getItem('messages.' + x.botSlug)
      }))
    }

    await navigator.clipboard.writeText(JSON.stringify(exp))

    alert('Exported to clipboard')
  }

  async function importAllFromClipboardJson() {
    const text = await navigator.clipboard.readText()

    const exp = JSON.parse(text)

    exp.messages.forEach(m => {
      localStorage.setItem(m.key, m.messages)
    })

    localStorage.setItem('characters', exp.characters)
    characterStore.loadCharactersFromLocalStorage()
    localStorage.setItem('settings', exp.settings)
    settingsStore.loadSettings()

    alert('Imported from clipboard')
  }

</script>

<template>
  <div class="fixed z-20 top-0 left-0 right-0 flex gap-2  text-white p-4 md:p-6">
      <button @click="exportAllToClipboardJson" class="whitespace-nowrap   backdrop-brightness-50 backdrop-blur-xl text-white rounded-lg px-3 py-2">Export</button>
      <button @click="importAllFromClipboardJson" class="whitespace-nowrap   backdrop-brightness-50 backdrop-blur-xl text-white rounded-lg px-3 py-2">Import</button>
  </div>
  <main class="p-4 md:p-6 pt-20 md:pt-24 mt-10">
    <div class="flex gap-y-10 gap-x-4 w-full flex-wrap">
      <button v-for="character in characterStore.characters" v-bind:key="character.botName" @click="$router.push('/chat/' + character.botSlug)" 
        :style="{ backgroundColor: character.color }"
        class="w-32 relative p-3 cursor-pointer hover:opacity-90 h-36 flex flex-col items-center justify-end backdrop-brightness-50 backdrop-blur-xl rounded-3xl" >
        <!-- <h2 class="text-2xl">{{ character.botName }}</h2> -->
        <p class="text-sm px-5 leading-3 mix-blend-difference text-white">{{ character.botName }}</p>
        <div class="buttons absolute top-2 right-2 z-10 opacity-0 hover:opacity-100 mix-blend-difference text-white">
          <button @click.stop="characterStore.deleteCharacter(character)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="absolute m-5 -top-3" v-html="drawRandomFace(character.avatar)" />
      </button>
      <button @click="characterStore.randomNewCharacter()" class="w-32 hover:opacity-90 cursor-pointer h-36 flex flex-col items-center justify-center text-white backdrop-brightness-50 backdrop-blur-xl rounded-3xl" >
        <h2 class="text-4xl">+</h2>
      </button>
    </div>
  </main>
</template>