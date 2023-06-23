<script setup lang="ts">
  import { Character } from '@/model/Character';
import { ChatMessage } from '@/model/ChatMessage';
import { useCharacterStore } from '@/stores/character';
import { useChatStore } from '@/stores/chat';
import { useSettingsStore } from '@/stores/settings';

  let characterStore = useCharacterStore();
  let chatStore = useChatStore();
  let settingsStore = useSettingsStore();

  async function exportAllToClipboardJson() {

    const exp = {
      characters: localStorage.getItem('characters'),
      settings: localStorage.getItem('settings'),
      messages: characterStore.characters.map(x => ({
        key: 'messages.' + x.getSlug(),
        messages: localStorage.getItem('messages.' + x.getSlug())
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
    // characterStore.characters = exp.characters.map(x => new Character(x.systemPrompt, x.summarizePrompt, x.myName, x.name, x.description))
    localStorage.setItem('characters', exp.characters)
    characterStore.loadCharactersFromLocalStorage()
    localStorage.setItem('settings', exp.settings)
    settingsStore.loadSettings()

    alert('Imported from clipboard')
  }

  function newCharacter() {
    let assistent = new Character(`Je bent een vriendelijke assistent`, `Schrijf een samenvatting (puntsgewijs) over deze conversatie.`, 'Gebruiker', 'Naamloos', "Assistent")
    characterStore.addCharacter(assistent)
    characterStore.saveCharacters()
  }
</script>

<template>
  <div class="fixed z-20 top-0 left-0 right-0 flex gap-2  text-white p-2 py-3 md:p-5">
      <button @click="exportAllToClipboardJson" class="whitespace-nowrap tracking-widest  uppercase text-sm  backdrop-brightness-50 backdrop-blur-xl text-white rounded-lg px-2 py-1.5">Export</button>
      <button @click="importAllFromClipboardJson" class="whitespace-nowrap tracking-widest  uppercase text-sm  backdrop-brightness-50 backdrop-blur-xl text-white rounded-lg px-2 py-1.5">Import</button>
  </div>
  <main class="p-2 md:p-6 pt-16 md:pt-24">
    <div class="flex gap-2 w-full flex-wrap">
      <button v-for="character in characterStore.characters" v-bind:key="character.name" @click="$router.push('/chat/' + character.getSlug())" class="w-32 cursor-pointer h-32 flex flex-col items-center justify-center text-white backdrop-brightness-50 backdrop-blur-xl rounded-full" >
        <h2 class="text-2xl">{{ character.name }}</h2>
        <p>{{ character.description }}</p>
      </button>
      <button @click="newCharacter" class="w-32 cursor-pointer h-32 flex flex-col items-center justify-center text-white backdrop-brightness-50 backdrop-blur-xl rounded-full" >
        <h2 class="text-4xl">+</h2>
      </button>
    </div>
  </main>
</template>