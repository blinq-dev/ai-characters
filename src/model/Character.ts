
export class Character {
    constructor(
        public systemPrompt: string,
        public summarizePrompt : string,
        public myName : string,
        public name : string,
        public description : string,
    ) {
      
    }

    getSlug() {
        return this.name.toLowerCase().replace(/ /g, '-')
    }

}