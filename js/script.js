
var synth = window.speechSynthesis;

const textForm = document.querySelector("form");
const textInput = document.querySelector("#input-data");
const voiceSelect = document.querySelector("#select-voice");
const rate = document.querySelector("#input-range");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");


let voices = [];

const getVoices = () => 
{

    voices = synth.getVoices();
    
    // dispaly voices 
    voices.forEach((voice)=>
    {
        const option = document.createElement("option");
        option.textContent = `${voice.name} - ${voice.lang}`;
        option.setAttribute("data-name",voice.name)
        option.setAttribute("data-lang",voice.lang)
        voiceSelect.appendChild(option);
    });
    
}


if(synth.onvoiceschanged !== undefined)
{
    synth.onvoiceschanged = getVoices;
}



// speak  

const speak = ()=>
{
    if(synth.speaking)
    {
        console.error("Speaking ..... ")
        return;
    }
    if(textInput.value !== '')
    {
        const speakText = new SpeechSynthesisUtterance(textInput.value);

        speakText.onend = e =>{
            console.log("Done Speaking");
        }

        speakText.onerror = e =>{
            console.error(" somthing error ")
        }

        // selected voice 
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute("data-name");
        voices.forEach((voice)=>
        {
            if(voice.name === selectedVoice)
            {
                speakText.voice = voice;
            }
        })

        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        synth.speak(speakText);
    }
}


textForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    speak();
    textInput.blur();
})

rate.addEventListener("change", e=>rateValue.textContent = rate.value)
pitch.addEventListener("change", e=>pitchValue.textContent = pitch.value)


voiceSelect.addEventListener("change",e=>speak());