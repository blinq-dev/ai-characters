import { ref } from "vue";
import { SSE } from 'sse.js';
import { BaseService } from "./BaseService";
import { useSettingsStore } from "@/stores/settings";

export type GptMessage = {
    role: string,
    content: string,
    name: string,
    function_call?: object,
}

export type GptConfig = {
    prompt?: string,
    temperature?: number,
    model: string,
    top_p?: number,
    max_tokens?: number,
    stop?: Array<string>,
    stream: boolean,
    messages: Array<GptMessage>,
}

export default class GptService extends BaseService {
    status: Ref<string>;
    result: Ref<string>;

    chatbot: string = '';
    // model: string = 'text-curie-001';
    // model: string = 'text-ada-001';
    model: string = 'gpt-3.5-turbo'
    // accessToken: string = '';
    // accessToken?: string = 'xx'

    config: GptConfig = {
        model: 'gpt-3.5-turbo',
        temperature: 1,
        messages: [],
        stream: true
    };

    constructor() {
        super();

        this.status = ref('initializing');
        this.result = ref('');
    }

    async complete(config?: GptConfig) {
        let settingsStore = useSettingsStore();
            let source = new SSE(
                `https://api.openai.com/v1/chat/completions`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + settingsStore.apiKey,
                    },
                    method: "POST",
                    payload: JSON.stringify({
                        ...this.config,
                        ...config ?? {},
                        stream: true,
                    }),
                }
            );

            source.addEventListener("message", async (e: any) => {
                if (e.data === "[DONE]") {
                    source.close();

                    this.trigger('done', this.result.value);
                    this.result.value = '';

                    return;
                }

                // Assuming we receive JSON-encoded data payloads:
                var payload = JSON.parse(e.data);
                // console.log(payload);
                let text = payload.choices[0].delta.content ?? '';

                this.result.value += text;

                this.trigger('progress', { result: this.result.value, partial: text });
            });

            source.stream();
           
            source.onerror = (e) => { 
                let decoded = JSON.parse(e.data);

                if (decoded.error.code == 'invalid_api_key') {
                    settingsStore.apiKey = prompt('Please enter your OpenAI API key', settingsStore.apiKey ?? '');

                    settingsStore.saveSettings();

                    return this.complete(config);
                }

                if (decoded.error.code == 'context_length_exceeded' && settingsStore.model != settingsStore.largeModel)  {
                    settingsStore.model = settingsStore.largeModel

                    console.log('Switching to large model');

                    this.complete({
                        ...config,
                        model: settingsStore.largeModel,
                    });
                } else {
                    alert('Error: ' + e.data);
                }
            };

    }

}