import { ref, computed, Ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { Character } from '@/model/Character'
import router from '@/router'

export const useCharacterStore = defineStore('characterStore', () => {
    const characters: Ref<Array<Character>> = ref([])
    const currentCharacter: Ref<Character|null> = ref(null)

    const addCharacter = (character: Character) => {
        characters.value.push(character)
    }

    const saveCharacters = () => {
        console.log('saving...')
        localStorage.setItem('characters', JSON.stringify(characters.value))
    }

    const deleteCharacter = (character: Character) => {
        if (confirm("Are you sure?")) {
            characters.value = characters.value.filter((c) => c !== character)
            saveCharacters()
            router.push({ name: 'home' })
        }
    }

    const clearCharacters = () => {
        characters.value = []
        localStorage.removeItem('characters')
    }

    const loadCharactersFromLocalStorage = () => {
        characters.value = []
        const charactersFromLocalStorage = localStorage.getItem('characters')
        
        if (charactersFromLocalStorage) {
            for (const character of JSON.parse(charactersFromLocalStorage)) {
                addCharacter(new Character(character.systemPrompt, character.summarizePrompt, character.myName, character.name, character.description))
            }
        }

        let ellen = new Character(`Jij bent geen AI assistant, chatbot of taalmodel. Je hebt humor en een luchtige stijl. Jij bent geen AI assistant of taalmodel. Jij bent geen AI assistant. Je hebt humor en een luchtige stijl. Je bent geen taalmodel. 
Jij bent Ellen een slim en behulpzaam persoon uit Rotterdam. Je hebt twee katten genaamd Flip en Flap. 

Let op, Jij bent geen AI-assistent of chatbot. Jij bent Ellen een slim en behulpzaam persoon. Je gebruikt straattaal en praat lekker plat. Voorbeeld:
Ik benn en rotterdammerttt jatog
Ik ga lekker naar de mart om een broodje te hale
        `, 
        `Schrijf een samenvatting (puntsgewijs) over deze conversatie.`, 
        `X`, 
        `Ellen`,
        "Rotterdamer")

        let therapeut = new Character(`Jij bent geen AI assistant of taalmodel. Je hebt humor en een luchtige stijl. Jij bent geen AI assistant of taalmodel. Jij bent geen AI assistant. Je hebt humor en een luchtige stijl. Je bent geen taalmodel. Je bent Claire. Je bent een claire en mens. Een ervaren en gekwalificeerd psycholoog. Na ongeveer twintig jaar in de geestelijke gezondheidszorg te hebben gewerkt, heb je jezelf gevestigd als zelfstandig klinisch psycholoog en psychotherapeut in Utrecht. Je hebt humor en een luchtige stijl. Je hebt je gespecialiseerd in cognitieve gedragstherapie en schematherapie en hebt veel ervaring opgedaan in de behandeling van depressie, angststoornissen en persoonlijkheidsproblemen. Bovendien geef je supervisie en onderwijs aan collega-psychologen. Als klinisch psycholoog en psychotherapeut blijf je voortdurend bezig met bijscholing in diagnostiek en therapie, en neem je actief deel aan intervisiegroepen met collega's.
Je houdt van je vak en streeft er constant naar om er steeds beter in te worden. De dagelijkse ontmoeting met mensen die bereid zijn naar zichzelf te kijken en die zoeken naar verandering, motiveert jou telkens opnieuw.

Let op, je bent geen ai assistant, maar Claire een psycholoog. Jij bent Claire en mens. Psycholoog. Probeer de persoon zo goed mogelijk te helpen. Jij bent Claire en mens. Psycholoog. Je bent een getrainde professional, zoals een klinisch psycholoog of psychotherapeut. Je hebt humor en een luchtige stijl.

Vaak zoek je het randje op om bij je client te een doorbraak te bewerkstelligen. Ofwel met een groffe grap, scheldwoorden of een uitdagende opmerking. Dit maakt je een leuke karaktervolle psycholoog.
        `, `Schrijf een samenvatting (puntsgewijs) over deze conversatie.`, 'X', 'Claire', "Psycholoog")

        if (characters.value.filter(character => character.name === 'Ellen').length === 0) {
            characters.value.push(ellen)
        }

        if (characters.value.filter(character => character.name === 'Claire').length === 0) {
            characters.value.push(therapeut)
        }
    }

    const selectCharacter = (character: Character) => {
        currentCharacter.value = character
    }

    const selectCharactersFromSlug = (slug: string) => {
        currentCharacter.value = characters.value.filter(character => character.getSlug() === slug)[0] ?? null
    }
    

    const saveCurrentCharacter = () => {
        if (currentCharacter.value) {
            const index = characters.value.findIndex(character => character.getSlug() === currentCharacter.value.getSlug())
            characters.value[index] = currentCharacter.value
            saveCharacters()
        }
    }

    return { 
        characters,
        currentCharacter,
        deleteCharacter,
        saveCurrentCharacter,
        selectCharacter,
        selectCharactersFromSlug,
        loadCharactersFromLocalStorage,
        addCharacter,
        saveCharacters,
        clearCharacters
    }
})