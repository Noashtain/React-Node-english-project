import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { IconButton } from '@mui/material';
import { useEffect, useState } from "react";

const WordSpeaker = ({ word }) => {
  const [voice, setVoice] = useState(null);

  useEffect(() => {
    // המתנה לטעינת הקולות
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      // מציאת קול אמריקאי נשי
      const preferredVoice = voices.find(voice => voice.lang === 'en-US' && voice.name.includes('Female'));
      // fallback לקול אמריקאי אחר אם קול נשי לא זמין
      const fallbackVoice = voices.find(voice => voice.lang === 'en-US');
      setVoice(preferredVoice || fallbackVoice);
    };

    // טוען את הקולות כשמתאפשר
    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const handleClick = () => {
    if (voice) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.voice = voice;
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;

      speechSynthesis.speak(utterance);
    } else {
      console.error("Voice not loaded yet or not found!");
    }
  };

  return (
    <IconButton onClick={handleClick} className='wordSpeakerButton'>
      <HiOutlineSpeakerWave />
    </IconButton>
  );
};

export default WordSpeaker;
