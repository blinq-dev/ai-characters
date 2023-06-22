
import { ref, watch, type Ref } from "vue";
import { BaseService } from "./BaseService";

export default class SpeechService extends BaseService {
    provider: SpeechSynthesis | null;
    status: Ref<string>;
    voiceList: Ref<SpeechSynthesisVoice[]> = ref([]);
    selectedVoice: Ref<string> = ref('');

    language: string = 'en-US';
    pitch: number = 1;
    rate: number = 1;

    queue: string[] = [];
    isSpeakingQueue: Ref<boolean> = ref(false);
    partialBuffer: string = '';
    partialTimeout: number|null = null;

    setLanguage(language: string) {
        this.language = language;
        this.populateVoiceList();
    }

    constructor(language: string = 'en-US') {
        super();

        this.provider = window.speechSynthesis;
        this.status = ref('started');
        this.language = language;

        this.populateVoiceList();
        this.provider.onvoiceschanged = this.populateVoiceList.bind(this);

        watch(this.selectedVoice, () => {
            console.log('Selected voice changed', this.selectedVoice.value);
            // Store in localstorage
            window.localStorage.setItem('selectedVoice', this.selectedVoice.value);
        });
    }

    populateVoiceList() {
        if (this.provider === null) return;

        this.voiceList.value = this.provider.getVoices()
            .filter(voice => voice.lang.includes(this.language));

        // Prepend a off value
        this.voiceList.value.unshift({
            default: false,
            lang: '',
            localService: false,
            name: 'Disabled',
            voiceURI: '',
        } as SpeechSynthesisVoice);


        if (this.voiceList.value.length > 0) {
            this.selectedVoice.value = this.voiceList.value[0].name;

            // Check if we have a selected voice in localstorage
            const selectedVoice = window.localStorage.getItem('selectedVoice');
            if (selectedVoice !== null) {
                const voice = this.voiceList.value.find(voice => voice.name === selectedVoice);
                if (voice !== undefined) {
                    this.selectedVoice.value = voice.name;
                }
            }
        }
    }

    getSelectedVoice() : SpeechSynthesisVoice|undefined {
        return this.voiceList.value.find(voice => voice.name === this.selectedVoice.value);
    }

    async speak(text: string) {
        return new Promise((resolve, reject) => {
            if (this.provider === null) return reject('SpeechSynthesis not supported');
            let selecedVoice = this.getSelectedVoice() ?? this.voiceList.value[0]

            if(selecedVoice.name === 'Disabled') {
                return reject('Voice is disabled');
            }

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.voice = this.getSelectedVoice() ?? this.voiceList.value[0];
            utterance.pitch = this.pitch;
            utterance.rate = this.rate;
            utterance.onend = resolve;
            utterance.onerror = reject;

            this.provider.speak(utterance);
        });
    }

    async speakQueue() {
        if (this.queue.length === 0) {
            console.log('hij is klaar');
            this.trigger('done', null);
        }

        const text = this.queue.shift();
        if (text === undefined) return;

        try {
            this.isSpeakingQueue.value = true;
            await this.speak(text);
            this.isSpeakingQueue.value = false;
        } catch (e) {
            this.isSpeakingQueue.value = false;
            console.error(e);
        }

        this.speakQueue();
    }

    async queueSpeak(text: string) {
        if (text.trim() === '') return;

        this.queue.push(text);

        if (this.isSpeakingQueue.value) return;

        this.trigger('start', null);

        await this.speakQueue();
    }

    async queueSpeakPartials(partialText: string) {
        this.partialBuffer += partialText;

        let triggers = ['.', '!', '?', ',', '...'];

        for (let i = 0; i < triggers.length; i++) {
            const trigger = triggers[i];

            if (this.partialBuffer.includes(trigger)) {
                const split = this.partialBuffer.split(trigger);
                const text = split[0] + trigger;

                // Keep the other parts
                this.partialBuffer = split.slice(1).join(trigger);

                this.queueSpeak(text);

                break;
            }
        }

        if (this.partialTimeout !== null) {
            window.clearTimeout(this.partialTimeout);
        }

        this.partialTimeout = window.setTimeout(() => {
            this.queueSpeak(this.partialBuffer);
            this.partialBuffer = '';
        }, 1000);
    }


    cancel() {
        if (this.provider === null) return;

        this.provider.cancel();
    }

    pause() {
        if (this.provider === null) return;

        this.provider.pause();
    }

    resume() {
        if (this.provider === null) return;

        this.provider.resume();
    }



}