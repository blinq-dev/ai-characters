import { ref, type Ref } from "vue";
import { BaseService } from "./BaseService";

export default class SpeechRecognitionService extends BaseService {
    recognition: SpeechRecognition | null;
    status: Ref<string>;
    transcript: Ref<string>;
    interimTranscript: Ref<string>;
    isListening: Ref<boolean> = ref(false);
    startWord: Ref<string> = ref('start nu');
    stopWord: Ref<string> = ref('stop nu');
    autoRestart: Ref<boolean> = ref(true);
    isStopping: boolean = false;
    timeout: number = 1000;
    debounced: number|null = null;

    setLanguage(language: string) {
        this.recognition.lang = language;
    }

    constructor(language: string = 'en-US') {
        super();

        try {
            this.recognition = new webkitSpeechRecognition();
        } catch (e) {
            this.recognition = new SpeechRecognition();
        }

        this.recognition.lang = language;
        this.status = ref('initializing');
        this.transcript = ref('');
        this.interimTranscript = ref('');

        this.recognition.onstart = this.onStart.bind(this);
        this.recognition.onresult = this.onResult.bind(this);
        this.recognition.onerror = this.onError.bind(this);
        this.recognition.onend = this.onEnd.bind(this);

        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = language;
    }


    onStart() {
        this.status.value = 'started';
    }

    startListen() {
        this.isListening.value = true;

        console.log('Status', this.status.value)

        if (this.status.value !== 'started') {
            try {
                this.start();
                this.status.value = 'started'
            } catch(e) {
                this.status.value = 'error'
                // console.error(e);
            }
        }
    }

    stopListen() {
        this.isListening.value = false;
        this.isStopping = true;
        this.stop();
        this.interimTranscript.value = '';
    }

    toggleListen() {
        if (this.isListen()) {
            this.stopListen();
        }
        else {
            this.startListen();
        }
    }

    isListen() {
        return this.isListening.value;
    }

    onResult(event: SpeechRecognitionEvent) {
        this.status.value = 'result';
        // 

        if (this.isStopping) {
            this.transcriptDone()
            return
        }

        this.interimTranscript.value = ''

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            let transcript = event.results[i][0].transcript;
            if (transcript.toLowerCase().includes(this.startWord.value)) {
                this.startListen();
            }

            if (this.isListen()) {
                transcript = transcript.replace(new RegExp(`.*${this.startWord.value}`, 'gi'), '');
                transcript = transcript.replace(new RegExp(`${this.stopWord.value}.*`, 'gi'), '');

                this.interimTranscript.value += transcript
            }
        }

        if (!this.isListen()) {
            return
        }

        if (this.interimTranscript.value.toLowerCase().includes(this.stopWord.value)) {
            this.transcriptDone()

            this.stopListen();

            return
        }

        if (this.debounced !== null) {
            clearTimeout(this.debounced);
        }

        this.debounced = setTimeout(() => {
            if (this.isListen()) {
                this.transcriptDone()
            }
        }, this.timeout)
    }

    transcriptDone() {
        // This will autorestart and prevent any additional data coming in
        this.isStopping = true;
        this.recognition?.stop();

        let value = this.interimTranscript.value;
        
        value = value.replace(new RegExp(`.*${this.startWord.value}`, 'gi'), '');
        value = value.replace(new RegExp(`${this.stopWord.value}.*`, 'gi'), '');

        if (value) {
            this.trigger('transcript', value);
        }

        this.interimTranscript.value = '';
    }

    onError(event: SpeechRecognitionErrorEvent) {
        this.status.value = 'error';
        console.log(event);
    }

    onEnd() {
        this.status.value = 'stopped';
        this.isStopping = false;

        if (this.autoRestart) {
            setTimeout(() => {
                this.start();
            }, 1);
        }

        this.trigger('ended', null);
    }

    async start() {
        if (this.status.value !== 'started') {
            try {
                this.recognition?.start();
            } catch(e) {
                console.error(e);
            }
        }
    }

    stop() {
        this.isStopping = true;
        this.autoRestart = false;

        this.once('ended', () => {
            this.autoRestart = true;
            this.isStopping = false;
        })

        if (this.status.value === 'started') {
            this.recognition?.stop();
        }
    }

   
}