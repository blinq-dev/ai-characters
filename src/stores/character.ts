import { ref, computed, Ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { Character } from '@/model/Character'
import router from '@/router'
import { nanoid } from 'nanoid'
import { genRandomFace, pickRandom, sluggify } from '@/helpers'

export const useCharacterStore = defineStore('characterStore', () => {
    const characters: Ref<Array<Character>> = ref([])
    const selectedCharacter: Ref<Character|null> = ref(null)

    const addCharacter = (character: Character) => {
        characters.value.push(character)
    }

    const deleteCharacter = (character: Character) => {
        if (confirm("Are you sure?")) {
            characters.value = characters.value.filter((c) => c !== character)
            saveCharacters()
            router.push({ name: 'home' })
        }
    }

    const saveCharacters = () => {
        console.log('saving...')
        localStorage.setItem('characters', JSON.stringify(characters.value))
    }

    const clearCharacters = () => {
        characters.value = []
        localStorage.removeItem('characters')
    }


    const selectCharacter = (character: Character) => {
        selectedCharacter.value = character
    }

    const saveSelectedCharacter = () => {
        if (selectedCharacter?.value) {
            const index = characters.value.findIndex(character => character.botSlug === selectedCharacter.value?.botSlug)
            characters.value[index] = selectedCharacter.value
            console.log('saving selected character...')
            saveCharacters()
        }
    }

    const selectCharactersFromSlug = (slug: string) => {
        selectedCharacter.value = characters.value.filter(character => character.botSlug === slug)[0] ?? null
    }

    const loadCharactersFromLocalStorage = () => {
        characters.value = []
        const charactersFromLocalStorage = localStorage.getItem('characters')
        
        if (charactersFromLocalStorage) {
            for (const character of JSON.parse(charactersFromLocalStorage)) {
                addCharacter(Character.fromJson(character))
            }
        }
    }

    const randomNewCharacter = () => {
        let names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Fred', 'Ginny', 'Harriet', 'Ivan', 'Justine', 'Mallory', 'Nancy', 'Olivia', 'Pat', 'Quinn', 'Rupert', 'Sybil', 'Trent', 'Victor', 'Walter', 'Yvonne', 'Zelda']
        let adjectives = {
            'Alice': ['Adventurous', 'Aggressive', 'Agreeable', 'Ambitious', 'Annoying', 'Anxious', 'Arrogant', 'Articulate', 'Assertive', 'Attentive'],
            'Bob': ['Boastful', 'Boring', 'Brave', 'Bright', 'Broad-minded'],
            'Charlie': ['Calm', 'Careful', 'Charming', 'Clever', 'Competitive', 'Conceited', 'Confident', 'Conscientious', 'Considerate', 'Convivial', 'Courageous', 'Creative', 'Cruel', 'Cultured', 'Cynical'],
            'Diana': ['Decisive', 'Determined', 'Dishonest', 'Disloyal', 'Disobedient', 'Disrespectful', 'Dissatisfied', 'Distractible'],
            'Eve': ['Easygoing', 'Emotional', 'Energetic', 'Enthusiastic', 'Exacting', 'Excitable', 'Experienced'],
            'Fred': ['Fair-minded', 'Faithful', 'Fearless', 'Forceful', 'Frank', 'Friendly', 'Fun-loving', 'Funny'],
            'Ginny': ['Generous', 'Gentle', 'Good', 'Gullible'],
            'Harriet': ['Hard-working', 'Helpful', 'Honest', 'Humorous'],
            'Ivan': ['Imaginative', 'Impatient', 'Impulsive', 'Independent', 'Industrious', 'Insecure', 'Insensitive', 'Insincere', 'Intelligent', 'Intolerant', 'Introverted', 'Irresponsible'],
            'Justine': ['Jealous', 'Jolly', 'Jovial', 'Joyous', 'Judgmental'],
            'Mallory': ['Mature', 'Methodical', 'Moody', 'Morose'],
            'Nancy': ['Narrow-minded', 'Nasty', 'Naughty', 'Negative', 'Neat', 'Nervous', 'Nice', 'Noble', 'Noisy'],
            'Olivia': ['Obedient', 'Obnoxious', 'Open', 'Optimistic', 'Organized', 'Original', 'Outgoing'],
            'Pat': ['Patient', 'Persistent', 'Pessimistic', 'Placid', 'Plucky', 'Polite', 'Popular', 'Pompous', 'Possessive', 'Power-hungry', 'Pretentious', 'Proud', 'Prudent', 'Punctual'],
            'Quinn': ['Quick-tempered', 'Quiet'],
            'Rupert': ['Rational', 'Realistic', 'Rebellious', 'Reliable', 'Reserved', 'Resourceful', 'Rude'],
            'Sybil': ['Selfish', 'Self-centered', 'Self-confident', 'Self-controlled', 'Self-conscious', 'Self-critical', 'Self-defensive', 'Self-disciplined', 'Self-indulgent', 'Self-reliant', 'Self-sufficient', 'Sensible', 'Sensitive', 'Sentimental', 'Serious', 'Shallow', 'Short-tempered', 'Shy', 'Silly', 'Sincere', 'Skeptical', 'Sloppy', 'Slow', 'Sly', 'Smart', 'Sneaky', 'Sociable', 'Spoiled', 'Stable', 'Stingy', 'Stoic', 'Stubborn', 'Stupid', 'Superficial'],
            'Trent': ['Tactful', 'Tactless', 'Talented', 'Thoughtful', 'Tidy', 'Timid', 'Touchy', 'Trusting'],
            'Victor': ['Versatile', 'Vivacious', 'Vulgar', 'Vulnerable'],
            'Walter': ['Warm-hearted', 'Willing', 'Wise', 'Witty', 'Worried'],
            'Yvonne': ['Youthful'],
            'Zelda': ['Zealous']

        }
        let colors = ['#a8d2fc', '#ffcda4', '#4bac68', '#cd423d'];

        let name = pickRandom(names)
        let adjective = pickRandom(adjectives[name])
        let description = adjective + ' ' + name;
        name = description
        let color = pickRandom(colors)
        let slug = nanoid()
    
        let assistent = new Character(slug, name, 'You play the role of ' + description + '. You are ' + adjective + ' in all ways possible. Never mention you are playing a role, stay in character. Do not start with your own name.', 'Summarize bullet-wise', description, color, 1.0, 500, undefined,undefined,genRandomFace());
    
        addCharacter(assistent)
        saveCharacters()
    }


    return { 
        characters,
        selectedCharacter,
        deleteCharacter,
        randomNewCharacter,
        saveSelectedCharacter,
        selectCharacter,
        selectCharactersFromSlug,
        loadCharactersFromLocalStorage,
        addCharacter,
        saveCharacters,
        clearCharacters
    }
})