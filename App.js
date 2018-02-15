import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    SafeAreaView
} from 'react-native';
import { Asset, Audio, Video } from 'expo';
import VideoPlayer from '@expo/videoplayer';

export default class App extends React.Component {
    state = {};
    async componentDidMount() {
        await Expo.Audio.setIsEnabledAsync(false);
    }
    createSound = async () => {
        const { sound, status } = await Audio.Sound.create(
            require('./assets/audio.mp3'),
            this.onSoundPlaybackStatusUpdate
        );
        this.sound = sound;
    };
    AudioSetIsEnabledAsyncTrue = () => {
        Expo.Audio.setIsEnabledAsync(true);
    };
    AudioSetIsEnabledAsyncFalse = () => {
        Expo.Audio.setIsEnabledAsync(false);
    };
    setAudioModeAsync = () => {
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS
        });
    };
    playAsyncSound = () => {
        // this.sound.playAsync();
        this.sound.setStatusAsync({ shouldPlay: true });
    };
    stopAsyncSound = () => {
        // this.sound.stopAsync();
        this.sound.setStatusAsync({ shouldPlay: false });
    };
    playAsyncVideo = () => {
        // this.video.playAsync();
        this.video.setStatusAsync({
            shouldPlay: true,
            isMuted: true,
            volume: 0
        });
    };
    stopAsyncVideo = () => {
        // this.video.stopAsync();
        this.video.setStatusAsync({
            shouldPlay: false,
            isMuted: true,
            volume: 0
        });
    };
    onSoundPlaybackStatusUpdate = status => {
        this.soundStatus = status;
        if (status.isPlaying) {
            this.setState({ soundPosition: status.positionMillis });
        }
    };
    onVideoPlaybackStatusUpdate = async status => {
        this.videoStatus = status;
        if (status.isPlaying) {
            this.setState({ videoPosition: status.positionMillis });
            if (this.soundStatus) {
                // if (!this.soundStatus.isPlaying) {
                //     if (
                //         status.positionMillis <= 10000 ||
                //         status.positionMillis >= 20000
                //     ) {
                //         if (this.sound != null) {
                //             await Expo.Audio.setIsEnabledAsync(true);
                //             await this.sound.setStatusAsync({
                //                 shouldPlay: true,
                //                 positionMillis: status.positionMillis
                //             });
                //         }
                //     }
                // } else {
                //     if (
                //         status.positionMillis > 10000 &&
                //         status.positionMillis < 20000
                //     ) {
                //         if (this.sound != null) {
                //             await this.sound.stopAsync();
                //             await Expo.Audio.setIsEnabledAsync(false);
                //         }
                //     }
                // }
            }
        } else if (status.error) {
            console.error(status.error);
        }
    };
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.container}>
                    <TouchableOpacity
                        onPress={this.AudioSetIsEnabledAsyncTrue}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>
                            AudioSetIsEnabledAsyncTrue
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.AudioSetIsEnabledAsyncFalse}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>
                            AudioSetIsEnabledAsyncFalse
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.setAudioModeAsync}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>setAudioModeAsync</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.createSound}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>createSound</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.playAsyncSound}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>playAsyncSound</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.stopAsyncSound}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>stopAsyncSound</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.playAsyncVideo}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>playAsyncVideo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.stopAsyncVideo}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>stopAsyncVideo</Text>
                    </TouchableOpacity>
                    <Text>Video: {this.state.videoPosition}</Text>
                    <Text>Sound: {this.state.soundPosition}</Text>
                    <Video
                        shouldPlay={false}
                        resizeMode={Video.RESIZE_MODE_CONTAIN}
                        source={require('./assets/video.mp4')}
                        isMuted
                        ref={video => (this.video = video)}
                        style={styles.video}
                        onPlaybackStatusUpdate={
                            this.onVideoPlaybackStatusUpdate
                        }
                    />
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    video: {
        width: '100%',
        height: 300
    },
    button: {
        backgroundColor: '#000',
        borderRadius: 5,
        marginHorizontal: 10,
        marginBottom: 10
    },
    buttonText: {
        color: '#fff',
        padding: 20
    }
});
