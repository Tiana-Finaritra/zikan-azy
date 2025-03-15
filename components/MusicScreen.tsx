// MusicScreen.tsx
import React from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import className from 'twrnc';
import { LucideHeart, SkipForward, SkipBack, Play, Pause } from 'lucide-react-native';
import { useSound } from '../context/SoundContext';

interface MusicScreenProps {
  onpress: () => void;
  track: { url: string; artwork: string; title: string; artist: string } | null;
}

const MusicScreen: React.FC<MusicScreenProps> = ({ onpress, track }) => {
  const { isPlaying, togglePlayStop } = useSound();

  if (!track) {
    return (
      <View style={className`absolute bg-black top-0 left-0 right-0 bottom-0 flex items-center justify-center`}>
        <Text style={className`text-white`}>Aucune musique sélectionnée</Text>
        <Pressable onPress={onpress} style={className`mt-5 p-3 bg-red-500 rounded`}>
          <Text style={className`text-white`}>Fermer</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View
      style={className`absolute bg-green-500 top-0 left-0 right-0 bottom-0 rounded-xl p-5 flex-col justify-center items-center gap-5`}
    >
      <View style={className`p-1 w-15 rounded-full bg-gray-500`} />
      <Pressable onPress={onpress}>
        <Image source={{ uri: track.artwork }} style={className`h-85 w-85 rounded-xl`} />
      </Pressable>
      <View style={className`flex-row justify-between items-center w-80`}>
        <View>
          <Text style={className`text-lg text-white font-bold`}>{track.title}</Text>
          <Text style={className`text-lg text-white`}>{track.artist || "Artiste inconnu"}</Text>
        </View>
        <LucideHeart color="red" fill="red" />
      </View>
      <View style={className`p-5 flex-row justify-center items-center gap-6`}>
        <SkipBack color="white" fill="white" />
        <Pressable onPress={togglePlayStop}>
          {isPlaying ? <Pause color="white" fill="white" /> : <Play color="white" fill="white" />}
        </Pressable>
        <SkipForward color="white" fill="white" />
      </View>
    </View>
  );
};

export default MusicScreen;