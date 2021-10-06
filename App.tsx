import React, { useState, useEffect } from 'react';
import { ActivityIndicator, TouchableOpacity, View, Alert, Text, StyleSheet, Button, ImageBackground } from 'react-native';
import { Camera } from "expo-camera";
import * as ScreenOrientation from "expo-screen-orientation";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as FaceDetector from 'expo-face-detector';

let camera: Camera;

const CameraHandler = () => {

    const [hasPermission, setHasPermission] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false)
    const [capturedImage, setCapturedImage] = useState<any>(null)
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [zoom, setZoom] = useState(0)

    useEffect(() => {
        setOrientationLock();
        (async () => {
          const { status } = await Camera.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
    }, []);

    const setOrientationLock = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);
    }

    const takePicture = async () => {

        const options = { quality: 1, autoFocus:false, skipProcessing: true, };

        if (!camera) {
            return;
        }

        const photo = await camera.takePictureAsync(options);
        // console.log(photo);
        setPreviewVisible(true);
        setCapturedImage(photo);

             
    }
    
    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    console.log(capturedImage)

    return ( 
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {
                previewVisible && capturedImage ? (
                  <View
                  style={{
                      backgroundColor: 'transparent',
                      flex: 1,
                      width: '100%',
                      height: '100%'
                  }}
              >
                  <ImageBackground
                      source={capturedImage}
                      style={{
                      flex: 1
                      }}
                  />
                  
                  <View
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: 30,
                      paddingTop: 8,
                      paddingBottom: 8,
                      justifyContent: 'space-evenly',
                      alignItems: 'flex-end',
                      flexDirection: 'row',
                      backgroundColor: 'rgba(0,0,0,0.5)',
                    }}
                  >
                      <TouchableOpacity
                        onPress={() => setPreviewVisible(false)}
                        style={{
                            width: 150,
                            height: 50,
                            justifyContent: 'center',
                            backgroundColor: "red",
                            borderRadius: 5,
                            alignItems: 'center'
                        }}
                      >
                        <Text
                          style={{color: '#fff'}}
                        >
                          Sair
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {}}
                        style={{
                            width: 150,
                            height: 50,
                            justifyContent: 'center',
                            backgroundColor: "#034afc",
                            borderRadius: 5,
                            alignItems: 'center'
                        }}
                      >
                        <Text
                          style={{color: '#fff'}}
                        >
                          Salvar
                        </Text>
                      </TouchableOpacity>
                  </View>
              </View>
                ) : (
                    <Camera
                        ratio="16:9"
                        ref={(r: Camera) => {
                            camera = r
                        }}
                        type={type}
                        style={styles.camera}
                        flashMode={'on'}
                        autoFocus={'on'}
                        zoom={zoom}
                    >
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: "transparent",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                marginVertical: 50,
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    width: 70,
                                    height: 70,
                                    bottom: 0,
                                    borderRadius: 50,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "#004AFC",
                                }}
                                onPress={takePicture}
                            >
                                <MaterialCommunityIcons name="camera" size={30} color="#FFF" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    width: 70,
                                    height: 70,
                                    bottom: 0,
                                    borderRadius: 50,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "#004AFC",
                                }}
                                onPress={() => {
                                    setType(
                                        type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                    );
                                }}>
                                <Text style={styles.text}> Flip </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    width: 70,
                                    height: 70,
                                    bottom: 0,
                                    borderRadius: 50,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "#004AFC",
                                }}
                                onPress={() => setZoom(zoom + 0.1)}>
                                <Text style={styles.text}> zoom </Text>
                            </TouchableOpacity>
                        </View>
                    </Camera>
                )
            }
        </View>
    )
};

export default CameraHandler;

const styles = StyleSheet.create({
    camera: {
      flex: 1,
      width: '100%'
    },
    buttonContainer: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      margin: 20,
    },
    button: {
      flex: 0.1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 18,
      color: 'white',
    },
});