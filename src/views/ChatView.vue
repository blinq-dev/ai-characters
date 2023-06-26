
<template>
  <div class="h-screen bg-[#2e333d]">
    <!-- Button bar -->
    <div v-if="!chatStore.overlayIsShown"
      class="fixed flex-grow-0 z-20 top-0 left-0 right-0 flex gap-2  text-white p-4 md:p-6 overflow-auto">
      <button @click="router.push({ name: 'characters' })"
        class="whitespace-nowrap  backdrop-brightness-50 backdrop-blur-xl text-white rounded-lg px-3 py-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
      </button>
      <button @click="chatStore.toggleOverlay()"
        class="whitespace-nowrap   backdrop-brightness-50 backdrop-blur-xl text-white rounded-lg px-3 py-2">Settings</button>
      <button @click="makeSummary"
        class="whitespace-nowrap   backdrop-brightness-50 backdrop-blur-xl text-white rounded-lg px-3 py-2">Summarize</button>
      <button @click="chatStore.clearMessages(selectedCharacter?.botSlug)"
        class="whitespace-nowrap   backdrop-brightness-50 backdrop-blur-xl text-white rounded-lg px-3 py-2">Clear
        messages</button>
      <button @click="characterStore.deleteCharacter(selectedCharacter)"
        class="whitespace-nowrap   backdrop-brightness-50 backdrop-blur-xl text-white rounded-lg px-3 py-2">Delete</button>
      <button class="whitespace-nowrap   backdrop-brightness-50 backdrop-blur-xl text-white rounded-lg px-3 py-2">
        Est tokens: {{ chatStore.estimatedTokenCount }}
      </button>
    </div>
    <!-- Overlay -->
    <div v-if="chatStore.overlayIsShown"
      class="fixed z-50 top-0 left-0 right-0 bottom-0 overflow-scroll backdrop-brightness-90 backdrop-blur-3xl text-white/80 p-5">
      <div class="flex flex-col gap-2">
        <div class="flex">
          <button @click="chatStore.toggleOverlay()"
            class="bg-black/50 backdrop-blur-xl ml-auto text-white rounded-full w-10 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="grid grid-cols-12 gap-4">
          <div class="flex col-span-12 flex-col gap-2 items-center mb-4 pt-10 -m-10 -mt-20"  :style="{ backgroundColor: color }">
            <button @click="newRandomFace()" class="w-48 h-48 rounded-3xl" v-html="drawRandomFace(avatar)" />
          </div>
          <div class="flex col-span-6 flex-col gap-2">
            <span>Bot name:</span>
            <input v-model="botName" class="border-transparent rounded-lg p-3 bg-black/40" />
          </div>
          <div class="flex col-span-6 flex-col gap-2">
            <span>Description:</span>
            <input v-model="description" class="border-transparent rounded-lg p-3 bg-black/40" />
          </div>
          <div class="flex col-span-6 flex-col gap-2">
            <span>Color:</span>
            <input v-model="color" class="border-transparent rounded-lg p-3 bg-black/40" />
          </div>
          <div class="flex col-span-6 flex-col gap-2">
            <span>Temperature:</span>
            <input type="number" step="0.1" min="0" max="1" v-model="temperature"
              class="border-transparent rounded-lg p-3 bg-black/40" />
          </div>
          <div class="flex col-span-6 flex-col gap-2">
            <span>Max tokens:</span>
            <input type="number" step="1" min="0" max="5000" v-model="maxTokens"
              class="border-transparent rounded-lg p-3 bg-black/40" />
          </div>
          <div class="flex col-span-12 flex-col gap-2">
            <span>Welcome message:</span>
            <input v-model="welcomeMessage" class="border-transparent rounded-lg p-3 bg-black/40" />
          </div>
          <div class="flex col-span-12 flex-col gap-2">
            <span>Random subject:</span>
            <input v-model="randomSubject" class="border-transparent rounded-lg p-3 bg-black/40" />
          </div>

          <div class="flex col-span-12 flex-col gap-2">
            <span>System prompt:</span>
            <textarea rows="5" v-model="systemPrompt" class=" border-transparent rounded-lg p-3 bg-black/40" />
          </div>
          <div class="flex col-span-12 flex-col gap-2">
            <span>Summarize prompt:</span>
            <textarea rows="5" v-model="summarizePrompt" class=" border-transparent rounded-lg p-3 bg-black/40" />
          </div>
          <div class="flex col-span-12 flex-col gap-2">
            <span>Speaking Voices: </span>
            <select v-model="speechService.selectedVoice.value"
              class="text-white/90 border-transparent rounded-lg p-2 bg-black/40">
              <option v-for="voice in speechService.voiceList.value" :value="voice.name">{{ voice.name }} - {{ voice.lang
              }}</option>
            </select>
          </div>
          <div class="col-span-6">Speech Recognition Status: {{ speechRecognitionService.status }}</div>
          <div class="col-span-6">Listening: {{ speechRecognitionService.isListening }}</div>
          <div class="col-span-6">Speaking: {{ speechService.status }}</div>
          <div class="col-span-6">Speaking Queue: {{ speechService.queue.length }} / {{ speechService.isSpeakingQueue }} </div>
        </div>
      </div>
    </div>
    <!-- Chat -->
    <div class="flex flex-col h-full">
      <div ref="scroller" class="flex grow overflow-y-auto pt-32">
        <div ref="scrolled" class="flex w-full h-auto gap-2 flex-col m-4 md:m-6 !mt-auto">
          <ChatBubble v-for="(message, index) in chatStore.messages"
            :show-user="chatStore.messagesSinceCheckpoint[index + 1]?.name !== message.name || typeof chatStore.messagesSinceCheckpoint[index + 1] === 'undefined'"
            :key="message.id" :message="message" />
        </div>
      </div>
      <div class="relative flex grow-0 shrink-0 px-4 md:px-6 flex-col bg-white/5">
        <textarea
          :placeholder="speechRecognitionService.interimTranscript.value ? speechRecognitionService.interimTranscript.value : 'Your message'"
          @keydown.enter="addMessageFromKeyboard" rows="4"
          class="py-4 text-lg resize-none focus:outline-none bg-transparent rounded-lg text-white" v-model="newMessage" />

        <button
          class="mr-4 md:mr-6 backdrop-blur-xl  transition-all cursor-pointer hover:scale-105 absolute flex items-center justify-center right-0 top-4 w-10 h-10 rounded-full"
          :class="{ 'backdrop-brightness-0 text-white !scale-100': speechRecognitionService.isListening.value, 'backdrop-brightness-90 text-white/40': !speechRecognitionService.isListening.value }"
          @click="toggleListen()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
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
import { drawRandomFace, genRandomFace, pickRandom } from '@/helpers';

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

const botName = ref('')
const botSlug = ref('')
const systemPrompt = ref('')
const summarizePrompt = ref('')
const description = ref('')
const color = ref('')
const temperature = ref(1.0)
const maxTokens = ref(250)
const welcomeMessage = ref('')
const randomSubject = ref('')
const avatar = ref('')

let selectedCharacter: Character | null = null

/* -------------------------------------------------------------------------- */
/*                                  Lifecycle                                 */
/* -------------------------------------------------------------------------- */
onMounted(async () => {
  let selectedCharacterSlug = router.currentRoute.value.params.slug

  if (selectedCharacterSlug) {
    selectedCharacterSlug = Array.isArray(selectedCharacterSlug) ? selectedCharacterSlug[0] : selectedCharacterSlug
    characterStore.selectCharactersFromSlug(selectedCharacterSlug)
  }

  selectedCharacter = characterStore.selectedCharacter

  if (selectedCharacter == null) {
    return router.push({ name: 'characters' })
  }

  botSlug.value = selectedCharacter.botSlug
  botName.value = selectedCharacter.botName
  systemPrompt.value = selectedCharacter.systemPrompt
  summarizePrompt.value = selectedCharacter.summarizePrompt
  description.value = selectedCharacter.description

  color.value = selectedCharacter.color
  temperature.value = selectedCharacter.temperature
  maxTokens.value = selectedCharacter.maxTokens
  welcomeMessage.value = selectedCharacter.welcomeMessage
  randomSubject.value = selectedCharacter.randomSubject
  avatar.value = selectedCharacter.avatar

  watch(botSlug, (newValue, oldValue) => {
    if (newValue != oldValue) {
      selectedCharacter.botSlug = newValue
      characterStore.saveSelectedCharacter()
      router.push({ name: 'chatWithCharacter', params: { slug: selectedCharacter.botSlug } })
    }
  })
  watch(botName, (newValue, oldValue) => {
    selectedCharacter.botName = newValue
    characterStore.saveSelectedCharacter()
  })
  watch(systemPrompt, (newValue) => {
    selectedCharacter.systemPrompt = newValue
    characterStore.saveSelectedCharacter()
  })
  watch(color, (newValue) => {
    selectedCharacter.color = newValue
    characterStore.saveSelectedCharacter()
  })
  watch(summarizePrompt, (newValue) => {
    selectedCharacter.summarizePrompt = newValue
    characterStore.saveSelectedCharacter()
  })
  watch(description, (newValue) => {
    selectedCharacter.description = newValue
    characterStore.saveSelectedCharacter()
  })

  watch(temperature, (newValue) => {
    selectedCharacter.temperature = newValue
    characterStore.saveSelectedCharacter()
  })
  watch(maxTokens, (newValue) => {
    selectedCharacter.maxTokens = newValue
    characterStore.saveSelectedCharacter()
  })
  watch(welcomeMessage, (newValue) => {
    selectedCharacter.welcomeMessage = newValue
    characterStore.saveSelectedCharacter()
  })
  watch(randomSubject, (newValue) => {
    selectedCharacter.randomSubject = newValue
    characterStore.saveSelectedCharacter()
  })
  watch(avatar, (newValue) => {
    selectedCharacter.avatar = newValue
    characterStore.saveSelectedCharacter()
  })

  // speechRecognitionService.start();

  speechRecognitionService.on('transcript', async (value: string) => {
    newMessage.value = value
    await addUserMessage();
  })

  chatStore.loadMessagesFromLocalStorage(selectedCharacter.botSlug)

  setTimeout(() => {
    scrollToBottom()

    if (selectedCharacter?.welcomeMessage) {
      surpriseMessage(selectedCharacter?.welcomeMessage.replace('[name]', settingsStore.myName), 1.0, 0.5, 1000)
    }
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


function newRandomFace() {
  avatar.value = genRandomFace()
  console.log('x')
}

function makeSummary() {
  scrollToBottom()
  let bot = selectedCharacter.botName
  let msg = chatStore.addMessage(new ChatMessage('', 'SUMMARY', 'assistant'));

  let systemPrompt = selectedCharacter.systemPrompt
  let log = chatStore.chatLogSinceCheckpoint

  console.log(log)

  brainService.complete({
    messages: [
      new ChatMessage(systemPrompt, selectedCharacter.botName, 'system').toGptMessage(),
      new ChatMessage('Conversatie log: ' + log, selectedCharacter.botName, 'assistant').toGptMessage(),
      new ChatMessage(selectedCharacter.summarizePrompt, selectedCharacter.botName, 'assistant').toGptMessage(),
    ],
    model: settingsStore.model,
    stream: true
  })

  brainService.on('progress', ({ result, partial }: { result: string, partial: string }) => {
    msg.setContentWeirdBug(result)
    scrollToBottom()
  })

  brainService.once('done', (result: string) => {
    msg.setContentWeirdBug(result)
    brainService.off('progress')
    scrollToBottom()

    nextTick(() => {
      scrollToBottom()

      chatStore.saveMessages(selectedCharacter.botSlug)
    });
  })
}

function surpriseMessage(extraPromptMessage = "", chance = 0.5, annekdoteChance = 0.5, timeout = 10000) {
  let bot = selectedCharacter.botName
  let user = settingsStore.myName

  let letsDoThis = Math.random() > (1 - chance)
  let isRandomSubject = Math.random() > (1 - annekdoteChance)

  // Sometimes add a extra message
  if (!letsDoThis) return

  console.log("Preparing surpise message")

  if (isRandomSubject) {
    let listOfRandomWords = ["Telescope", "Pineapple", "Fusion", "Blueprint", "Courage", "Sapphire", "Notebook", "Curiosity", "Dream", "Echelon", "Rainbow", "Library", "Lighthouse", "Harmonica", "Quantum", "Elephant", "Windmill", "Camouflage", "Zephyr", "Kaleidoscope", "Discover", "Flamingo", "Lavender", "Symphony", "Nebula", "Rhythm", "Echo", "Iridescent", "Pirate", "Voyage", "Whisper", "Silver", "Rejuvenate", "Sanctuary", "Solitude", "Lemonade", "Illusion", "Momentum", "Flicker", "Sunset", "Gravity", "Chimera", "Butterfly", "Silhouette", "Frost", "Radiance", "Enigma", "Journey", "Astronaut", "Galaxy"]
    let randomWord = pickRandom(listOfRandomWords)

    extraPromptMessage += selectedCharacter?.randomSubject?.replace("[subject]", randomWord);

    console.log(extraPromptMessage)
  }

  setTimeout(() => {
    let last2Messages = chatStore.messagesSinceCheckpoint.filter((x: ChatMessage) => !x.isCheckpoint()).slice(-2)

    if (
      newMessage.value.trim().length === 0 &&
      (
        (last2Messages.length == 2 && last2Messages[0].name === user && (last2Messages[1].name === bot)) ||
        (last2Messages.length == 1 && last2Messages[0].name === user) ||
        (last2Messages.length == 0)
      )
    ) {
      makeGptResut(extraPromptMessage);
    }
  }, timeout);

}

function makeGptResut(extraPromptText = '') {
  let bot = selectedCharacter.botName
  let user = settingsStore.myName

  let systemPrompt = new ChatMessage(selectedCharacter.systemPrompt + ". Dit gesprek is met " + user, bot, 'system').toGptMessage()
  let extraPrompt = extraPromptText ? new ChatMessage(extraPromptText, bot, 'system').toGptMessage() : null
  let msg = chatStore.addMessage(new ChatMessage('', bot, 'assistant'));

  console.log(selectedCharacter.systemPrompt)

  gptService.complete({
    messages: [
      systemPrompt,
      ...chatStore.messagesSinceCheckpoint.map((x: ChatMessage) => x.toGptMessage()),
      extraPrompt,
    ].filter(x => x),
    temperature: selectedCharacter?.temperature,
    max_tokens: selectedCharacter?.maxTokens,
    model: settingsStore.model,
    stream: true
  })

  gptService.on('progress', ({ result, partial }: { result: string, partial: string }) => {
    msg.content.value = result
    scrollToBottom()
    speechService.queueSpeakPartials(partial)
  })

  speechRecognitionService.stopListen();

  speechService.once('done', () => {
    speechRecognitionService.startListen();
  });

  gptService.once('done', (result: string) => {
    console.log(chatStore.chatLogSinceCheckpoint)
    msg.content.value = result
    gptService.off('progress')

    chatStore.saveMessages(selectedCharacter.botSlug)
  })

}

/* -------------------------------------------------------------------------- */
/*                                   Methods                                  */
/* -------------------------------------------------------------------------- */
async function addUserMessage() {
  chatStore.addMessage(new ChatMessage(newMessage.value, settingsStore.myName, 'user'));

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

<style></style>