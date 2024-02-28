import React, {useEffect, useState} from 'react';
import Sound from 'react-native-sound';

const SoundPlayer = ({soundOn}) => {
  const [soundObject, setSoundObject] = useState(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const sound = new Sound('alarm1.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      setSoundObject(sound);
    });

    // Clean up function to stop and release the sound object
    return () => {
      if (soundObject) {
        soundObject.stop();
        soundObject.release();
      }
    };
  }, []);

  useEffect(() => {
    if (soundOn && soundObject && !playing) {
      console.log('play');
      setPlaying(true);
      soundObject.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
        setPlaying(false);
      });
    } else if (!soundOn && soundObject && playing) {
      console.log('stop');
      setPlaying(false);
      soundObject.stop();
    }
  }, [soundOn, soundObject, playing]);

  return null;
};

export default SoundPlayer;
