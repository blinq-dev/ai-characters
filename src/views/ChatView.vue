
<template>
  <div class="h-screen">
    <!-- Button bar -->
    <div v-if="!chatStore.overlayIsShown" class="fixed flex-grow-0 z-20 top-0 left-0 right-0 flex gap-2  text-white p-2 py-3 md:p-5 overflow-auto">
      <button @click="router.push({ name: 'characters'})" class="whitespace-nowrap tracking-widestst  uppercase text-sm  backdrop-brightness-50 backdrop-blur-xl text-white rounded-lg px-2 py-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
      </button>
      <button @click="chatStore.toggleOverlay()" class="whitespace-nowrap tracking-widest  uppercase text-sm  backdrop-brightness-50 backdrop-blur-xl text-white rounded-lg px-2 py-1">Settings</button>
      <button @click="makeSummary" class="whitespace-nowrap tracking-widest  uppercase text-sm  backdrop-brightness-50 backdrop-blur-xl text-white rounded-lg px-2 py-1">Summarize</button>
      <button @click="chatStore.clearMessages(currentCharacter?.getSlug())" class="whitespace-nowrap tracking-widest  uppercase text-sm  backdrop-brightness-50 backdrop-blur-xl text-white rounded-lg px-2 py-1">Clear messages</button>
      <button @click="characterStore.deleteCharacter(currentCharacter)" class="whitespace-nowrap tracking-widest  uppercase text-sm  backdrop-brightness-50 backdrop-blur-xl text-white rounded-lg px-2 py-1">Delete</button>
      <button class="whitespace-nowrap tracking-widest  uppercase text-sm  backdrop-brightness-50 backdrop-blur-xl text-white rounded-lg px-2 py-1.5">
        Est tokens: {{  chatStore.estimatedTokenCount }}
      </button>
    </div>
    <!-- Overlay -->
    <div v-if="chatStore.overlayIsShown" class="fixed z-50 top-0 left-0 right-0 bottom-0 overflow-scroll backdrop-brightness-90 backdrop-blur-3xl text-white/80 p-5">
      <div class="flex flex-col gap-2">
        <div class="flex">
          <button @click="chatStore.toggleOverlay()" class="bg-black/50 backdrop-blur-xl ml-auto text-white rounded-full w-10 p-2">
            X
          </button>
        </div>
        <div class="flex flex-col gap-2">
          <span>Speaking Voices: </span>
          <select v-model="speechService.selectedVoice.value" class="text-white/90 border-transparent rounded-lg p-2 bg-black/40">
            <option v-for="voice in speechService.voiceList.value" :value="voice.name">{{ voice.name }} - {{ voice.lang }}</option>
          </select>
        </div>
        <div class="flex flex-col gap-2">
          <span>My name:</span>
          <input v-model="myName" class="border-transparent rounded-lg p-3 bg-black/40" />
        </div>
        <div class="flex flex-col gap-2">
          <span>Bot name:</span>
          <input v-model="botName" class="border-transparent rounded-lg p-3 bg-black/40" />
        </div>
        <div class="flex flex-col gap-2">
          <span>Description:</span>
          <input v-model="description" class="border-transparent rounded-lg p-3 bg-black/40" />
        </div>
        <div class="flex flex-col gap-2">
          <span>System prompt:</span>
          <textarea rows="8" v-model="systemPrompt" class=" border-transparent rounded-lg p-3 bg-black/40" />
        </div>
        <div class="flex flex-col gap-2">
          <span>Summarize prompt:</span>
          <textarea rows="8" v-model="summarizePrompt" class=" border-transparent rounded-lg p-3 bg-black/40" />
        </div>
        <div>Speech Recognition Status: {{ speechRecognitionService.status }}</div>
        <div>Listening: {{ speechRecognitionService.isListening }}</div>
        <div>Speaking: {{ speechService.status }}</div>
        <div>Speaking Queue: {{ speechService.queue.length }} / {{ speechService.isSpeakingQueue }} </div>
      </div>
    </div>
    <!-- Chat -->
    <div class="flex flex-col h-full">
      <div ref="scroller" class="flex grow overflow-y-auto pt-32">
        <div ref="scrolled" class="flex w-full h-auto gap-2 flex-col m-2 md:m-5 !mt-auto">
          <ChatBubble v-for="(message, index) in chatStore.messages" :show-user="chatStore.messagesSinceCheckpoint[index+1]?.name !== message.name || typeof chatStore.messagesSinceCheckpoint[index+1] === 'undefined'"  :key="message.id" :message="message" />
        </div>
      </div>
      <div class="relative flex grow-0 shrink-0 px-2 md:px-6 flex-col border-t border-t-2">
        <textarea :placeholder="speechRecognitionService.interimTranscript.value" @keydown.enter="addMessageFromKeyboard" rows="3" class="py-2 text-lg resize-none focus:outline-none bg-transparent rounded-lg text-white" v-model="newMessage" />

        <button 
           class="mr-2 md:mr-6 backdrop-blur-xl  transition-all cursor-pointer hover:scale-105 absolute flex items-center justify-center right-0 top-4 w-10 h-10 rounded-full"
          :class="{ 'backdrop-brightness-0 text-white !scale-100': speechRecognitionService.isListening.value, 'backdrop-brightness-90 text-white/40': !speechRecognitionService.isListening.value }"
          @click="toggleListen()"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatBubble from '@/components/ChatBubble.vue';
import { useChatStore } from '@/stores/chat';
import { ref, onMounted, nextTick, watch } from 'vue';
import { ChatMessage } from '@/model/ChatMessage'
import SpeechRecognitionService from '@/services/SpeechRecognitionService';
import GptService from '@/services/GptService';
import SpeechService from '@/services/SpeechService';
import router from '@/router';
import { useCharacterStore } from '@/stores/character';
import { useSettingsStore } from '@/stores/settings';
import { Character } from '@/model/Character';

const newMessage = ref('');
const scroller = ref<HTMLElement>();
const scrolled = ref<HTMLElement>();
const chatStore = useChatStore();
const characterStore = useCharacterStore();
const settingsStore = useSettingsStore();

const speechRecognitionService = new SpeechRecognitionService('nl-NL');
const gptService = new GptService();
const speechService = new SpeechService('nl');
const brainService = new GptService();

const myName = ref('')
const botName = ref('')
const systemPrompt = ref('')
const summarizePrompt = ref('')
const description = ref('')

let currentCharacter : Character|null = null

/* -------------------------------------------------------------------------- */
/*                                  Lifecycle                                 */
/* -------------------------------------------------------------------------- */
onMounted(async () => {
  let currentCharacterSlug = router.currentRoute.value.params.slug

  if (currentCharacterSlug) {
    currentCharacterSlug = Array.isArray(currentCharacterSlug) ? currentCharacterSlug[0] : currentCharacterSlug
    characterStore.selectCharactersFromSlug(currentCharacterSlug)
  }

  currentCharacter = characterStore.currentCharacter

  if (!currentCharacter) {
    return router.push({ name: 'characters' })
  }

  myName.value = currentCharacter.myName
  botName.value = currentCharacter.name
  systemPrompt.value = currentCharacter.systemPrompt
  summarizePrompt.value = currentCharacter.summarizePrompt
  description.value = currentCharacter.description

  watch( myName, (newValue) => {
    currentCharacter.myName = newValue
    characterStore.saveCurrentCharacter()
  })
  watch( botName, (newValue, oldValue) => {
    if (newValue != oldValue) {
      currentCharacter.name = newValue
      characterStore.saveCurrentCharacter()
      router.push({ name: 'chatWithCharacter', params: { slug: currentCharacter.getSlug() } })
    }
  })
  watch( systemPrompt, (newValue) => {
    currentCharacter.systemPrompt = newValue
    characterStore.saveCurrentCharacter()
  })
  watch( summarizePrompt, (newValue) => {
    currentCharacter.summarizePrompt = newValue
    characterStore.saveCurrentCharacter()
  })
  watch( description, (newValue) => {
    currentCharacter.description = newValue
    characterStore.saveCurrentCharacter()
  })

  // speechRecognitionService.start();

  speechRecognitionService.on('transcript', async (value: string) => {
    newMessage.value = value
    await addUserMessage();
  })

  chatStore.loadMessagesFromLocalStorage(currentCharacter.getSlug())

  setTimeout(() => {
    scrollToBottom()
    surpriseMessage("Je gesprekpartner is er weer. Begroet diegene vriendelijk", 0.8, 0.5, 1000)
  }, 10);
});

async function toggleListen() {
  speechRecognitionService.toggleListen();
}

function scrollToBottom() {
  if (scroller.value) {
    scroller.value.scrollTop = scroller.value.scrollHeight;
  }
}



function makeSummary() {
  scrollToBottom()
  let bot = currentCharacter.name
  let msg = chatStore.addMessage(new ChatMessage('', 'SUMMARY', 'assistant'));

  let systemPrompt = currentCharacter.systemPrompt
  let log = chatStore.chatLogSinceCheckpoint

  console.log(log)

  brainService.complete({
    messages: [
      new ChatMessage(systemPrompt, currentCharacter.name, 'system').toGptMessage(),
      new ChatMessage('Conversatie log: ' + log, currentCharacter.name, 'assistant').toGptMessage(),
      new ChatMessage(currentCharacter.summarizePrompt, currentCharacter.name, 'assistant').toGptMessage(),
    ],
    model: settingsStore.model,
    stream: true
  })

  brainService.on('progress', ({ result, partial }: {result: string, partial: string}) => {
    msg.setContentWeirdBug(result)
    scrollToBottom()
  })
  
  brainService.once('done', (result : string) => {
    msg.setContentWeirdBug(result)
    brainService.off('progress')
    scrollToBottom()

    nextTick(() => {
      scrollToBottom()

      chatStore.saveMessages(currentCharacter.getSlug())
    });
  })
}

function surpriseMessage(extraPromptMessage = "", chance = 0.5, annekdoteChance = 0.5, timeout = 10000) {
  let bot = currentCharacter.name
  let user = currentCharacter.myName

  let letsDoThis = Math.random() > (1 - chance)
  let isAnnekdote = Math.random() > (1 - annekdoteChance)

  // Sometimes add a extra message
  if (!letsDoThis) return
  
  console.log("Preparing surpise message")

  if (isAnnekdote) {
    console.log("Met annekdote");
    let list = ["Appel","Dromen","Verlichting","Monument","Zwemmen","Kasteel","Harmonie","Glans","Oceaan","Rots","Optimisme","Lente","Galerij","Schildpad","Erfenis","Vliegtuig","Duurzaam","Technologie","Zonsondergang","Wandelaar","Regenboog","Ambacht","Vuurwerk","Dinosaurus","Kristal","Melodie","Circus","Sneeuwvlok","Thee","Zilver","Ruimteschip","Aardbeving","Vlinder","Skyscraper","Puzzel","Woestijn","Tulp","Ontdekking","Schoolbord","Marathon","Mysterie","Zonnewijzer","Inspiratie","Nachtegaal","Zomerhitte","Rivier","Sterrenbeeld","Baksteen","Horizon","Boekwinkel","Telescoop","Flamingo","Karamel","Vulkaan","Filosofie","Goudsmid","Walvis","Zandkasteel","Windmolen","Jazz"]
    let what = ["geinige mop", "leuke vraag", "grappige annekdote"]
    let random = list[Math.floor(Math.random() * list.length)];
    let randomWhat = what[Math.floor(Math.random() * what.length)];

    extraPromptMessage += " en stel een leuke vraag of vertel een " + randomWhat + "  over " + random + ". Hou het wel passend binnen je rol."

    console.log(extraPromptMessage)
  }

  setTimeout(() => {
    let last2Messages = chatStore.messagesSinceCheckpoint.filter((x : ChatMessage) => !x.isCheckpoint()).slice(-2)

    if (
      newMessage.value.trim().length === 0 &&
        (
          (last2Messages.length == 2 && last2Messages[0].name === user && (last2Messages[1].name === bot )) ||
          (last2Messages.length == 1 && last2Messages[0].name === user) ||
          (last2Messages.length == 0)
        )
      ) {
      makeGptResut(extraPromptMessage);
    }
  }, timeout);

}

function makeGptResut(extraPromptText = '') {
  let bot = currentCharacter.name
  let user = currentCharacter.myName

  let systemPrompt = new ChatMessage(currentCharacter.systemPrompt + ". Dit gesprek is met " + user, bot, 'system').toGptMessage()
  let extraPrompt = extraPromptText ? new ChatMessage(extraPromptText, bot, 'system').toGptMessage() : null
  let msg = chatStore.addMessage(new ChatMessage('', bot, 'assistant'));

  console.log(currentCharacter.systemPrompt)

  gptService.complete({
    messages: [
      systemPrompt,
      ...chatStore.messagesSinceCheckpoint.map((x: ChatMessage) => x.toGptMessage()),
      extraPrompt,
    ].filter(x => x),
    temperature: 1,
    model: settingsStore.model,
    stream: true
  })

  gptService.on('progress', ({ result, partial }: {result: string, partial: string}) => {
    msg.content.value = result
    scrollToBottom()
    speechService.queueSpeakPartials(partial)
  })

  speechRecognitionService.stopListen();

  speechService.once('done', () => {
    speechRecognitionService.startListen();
  });

  gptService.once('done', (result : string) => {
    console.log(chatStore.chatLogSinceCheckpoint)
    msg.content.value = result
    gptService.off('progress')

    chatStore.saveMessages(currentCharacter.getSlug())
    
    // Scroll to bottom
    nextTick(() => {
      scrollToBottom()

      // surpriseMessage("Je gesprekspartner heeft al even niet gereageerd. Misschien kan je een vraag stellen?", 0.5, 0.5, 10000)
    });
  })

}

/* -------------------------------------------------------------------------- */
/*                                   Methods                                  */
/* -------------------------------------------------------------------------- */
async function addUserMessage() {
  chatStore.addMessage(new ChatMessage(newMessage.value, currentCharacter.myName, 'user'));

  newMessage.value = '';

  makeGptResut();

  // Scroll to bottom
  nextTick(() => {
    scrollToBottom()
  });
}

async function addMessageFromKeyboard(ev: KeyboardEvent) {
  if (ev.shiftKey) return;

  await addUserMessage();

  ev.preventDefault();
}
</script>

<style>

</style>