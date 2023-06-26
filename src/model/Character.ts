
export class Character {
    constructor(
        public botSlug : string,
        public botName : string,
        public systemPrompt: string,
        public summarizePrompt : string,
        public description : string,
        public color : string = '#000000',
        public temperature : number = 1.0,
        public maxTokens : number = 250,
        public welcomeMessage: string = '[name] entered the room, say hi!',
        public randomSubject: string = 'Tell a small personal anecdote about: [subject]. Keep your role.',
        public avatar: any = null
    ) {
      
    }

    static fromJson(json: any) {
        return new Character(
            json.botSlug,
            json.botName,
            json.systemPrompt,
            json.summarizePrompt,
            json.description,
            json.color,
            json.temperature,
            json.maxTokens,
            json.welcomeMessage,
            json.randomSubject,
            json.avatar,
        )
    }
}