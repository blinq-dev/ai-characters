
import { GptMessage } from "@/services/GptService";
import { nanoid } from "nanoid";
import { ref, watch, type Ref } from "vue";
import DOMPurify from 'dompurify';
import { marked } from 'marked';

export class ChatMessage {
    public name: string = "";
    public content: Ref<string> = ref("");
    public role: string = "user";
    public id: string = "";
    public side = "left";

    constructor(content: string, name: string, role: string) {
        this.content = ref(content);
        this.name = name.replace(/\W/g, "");
        this.role = role;
        this.id = nanoid()
        this.side = role === "user" ? "left" : "right";
    }

    toGptMessage() : GptMessage {
        return {
            role: this.role,
            content: this.getContentWeirdBug(),
            name: this.name,
        };
    }

    isCheckpoint() {
        return this.name === "SUMMARY"
    }

    getContentWeirdBug() {
        return typeof this.content === "string" ? this.content : this.content.value ?? "";
    }

    setContentWeirdBug(content: string) {
        if (typeof this.content === "string") {
            this.content = ref(content);
        } else {
            this.content.value = content;
        }
    }

    getHtmlContent() {
        const purify = DOMPurify(window);
        return purify.sanitize(marked.parse(this.getContentWeirdBug(), {
            mangle: false,
            headerIds: false,
        }))
        // return marked.parse(this.getContentWeirdBug())

        // return (this.getContentWeirdBug())
        //     .trim()
        //     .replace(/\n/g, "<br/>")
        //     .replace(/(https?:\/\/[^\s]+)/g, "<a href='$1' target='_blank'>$1</a>");
    }
}