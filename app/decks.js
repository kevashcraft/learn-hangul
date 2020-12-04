const fs = require('fs')

// google text-to-speech
const textToSpeech = require('@google-cloud/text-to-speech');
const ttsClient = new textToSpeech.TextToSpeechClient({keyFilename: '/secrets/spanish-photo-flash-tts.json'});

const hangul = require('./hangul.json')

main()

async function main () {
    const deck = {}

    for (let group in hangul) {
        deck[group] = {}
        for (let letter in hangul[group]) {
            const word = hangul[group][letter]
            console.log('getting', word)
            await new Promise(r => setTimeout(r, 250))
            const audio = await getAudio(word)
            deck[group][letter] = { word, audio }
        }
    }

    fs.writeFileSync('src/assets/deck.json', JSON.stringify(deck))
}

// get audio
async function getAudio(text) {
    const filename = `tmp/${text}`
    if (fs.existsSync(filename)) return fs.readFileSync(filename).toString()

    console.log('downloading', text)
    const request = {
        input: { text },
        voice: {
            languageCode: 'ko-KR',
            // ssmlGender: 'FEMALE',
            name: 'ko-KR-Wavenet-C'
        },
        audioConfig: {
            audioEncoding: 'MP3',
            pitch: 0,
            effectsProfileId: ['headphone-class-device'],
            speakingRate: '.9'
        },
    }
    let [response] = await ttsClient.synthesizeSpeech(request)
    const audio = 'data:audio/mp3;base64,' + response.audioContent.toString('base64')
    if (!fs.existsSync('tmp')) fs.mkdirSync('tmp')
    fs.writeFileSync(filename, audio)
    return audio
}

async function getDeckSize(filename) {
    console.log('getting deck size for', filename)
    const [metadata] = await storage.bucket(decksBucket).file(filename).getMetadata()
    let size = metadata.size
    console.log("size", size)
    return size
}

async function saveData(filename, data, public) {
    if (public) {
        await storage.bucket(decksBucket).file(filename).save(JSON.stringify(data), {gzip: true, resumable: false})
    } else {
        await storage.bucket(fullDecksBucket).file(filename).save(JSON.stringify(data), {gzip: true, resumable: false})
    }
}
