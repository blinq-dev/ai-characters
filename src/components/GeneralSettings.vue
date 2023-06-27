<script setup lang="ts">
import { useStateStore } from '@/stores/state';
import { useSettingsStore } from '@/stores/settings';
import InputGroup from './UI/InputGroup.vue';
import InputText from './UI/InputText.vue';
import Overlay from './UI/Overlay.vue';
import { drawRandomFace, genRandomFace } from '@/helpers';

let stateStore = useStateStore();
let settingsStore = useSettingsStore();

function newRandomFace() {
  settingsStore.avatar = genRandomFace()
}

</script>

<template>
    <Overlay v-if="stateStore.showGeneralSettings">
      <div class="flex">
          <button @click="stateStore.toggleGeneralSettings()"
            class="bg-black/50 backdrop-blur-xl ml-auto text-white rounded-full w-10 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      <div class="grid grid-cols-12 gap-4">
        <div class="flex col-span-12 flex-col gap-2 items-center mb-4 pt-10 -m-10 -mt-20"  :style="{ backgroundColor: settingsStore.color }">
            <button @click="newRandomFace()" class="w-48 h-48 rounded-3xl" v-html="drawRandomFace(settingsStore.avatar)" />
        </div>

        <InputGroup label="My name">
          <InputText v-model="settingsStore.myName" />
        </InputGroup>
        <InputGroup label="Small model">
          <InputText v-model="settingsStore.smallModel" />
        </InputGroup>
        <InputGroup label="Large model">
          <InputText v-model="settingsStore.largeModel" />
        </InputGroup>
        <InputGroup label="API Key">
          <InputText v-model="settingsStore.apiKey" />
        </InputGroup>
        <InputGroup label="Color">
          <div class="flex gap-3 flex-row">
            <div @click="settingsStore.color = color" v-for="color in settingsStore.availableColors" :style="{ backgroundColor: color }" class="w-10 h-10 cursor-pointer rounded-full"></div>
          </div>
        </InputGroup>
      </div>
    </Overlay>
</template> 