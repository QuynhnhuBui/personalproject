import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Text,
  Alert,
  PermissionsAndroid
} from 'react-native'
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Sizes } from '@dungdang/react-native-basic';
import CameraRoll from "@react-native-community/cameraroll";
import ImageSlide from './ImageSlide'
import Loading from './Loading'

const requestCameraPermission = async () => {
  try {
    let granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can ReadStorage");
    } else {
      console.log("ReadStorage permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

const requestReadStoragePermission = async () => {
  try {
    let granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can ReadStorage");
    } else {
      console.log("ReadStorage permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
}

const requestWriteStoragePermission = async () => {
  try {
    let granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can WriteStorage");
    } else {
      console.log("ReadStorage permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

export default class Camera extends Component {

  constructor(props) {
    super(props)
    this.state = {
      image: [],
      multiple: this.props.navigation.getParam('multiple'),
      loading: false
    },
      this.imageSlide = React.createRef()
  }

  async componentDidMount() {
    await requestReadStoragePermission()
    await requestCameraPermission()
    await requestWriteStoragePermission()
  }

  takePicture = async (camera) => {
    const options = {
      quality: 1,
      // base64: true,
      // width: 500,
      // height: 500,
    };
    const data = await camera.takePictureAsync(options);

    if (!this.state.multiple) {
      await CameraRoll.save('file://' + data.uri, 'photo')
      this.props.navigation.state.params.returnData(
        {
          selectedImage: data
        }
      )
      this.props.navigation.goBack()
    } else {
      this.setState({
        image: [...this.state.image, data]
      }, () => {
        console.log(this.state.image.length)
      })
    }

  };

  render() {
    return (
      <View style={stylesTakePicture.container}>
        {this.state.loading && <Loading />}
        <RNCamera
          style={stylesTakePicture.preview}
          type={RNCamera.Constants.Type.back}
          // flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >
          {({ camera, status, }) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View
                style={{
                  width: '100%',
                  flex: 1,
                  flexDirection: 'column',
                }}
              >
                <TouchableOpacity
                  style={{
                    flex: 0,
                    position: 'absolute',
                    top: Sizes.s60,
                    left: Sizes.s40,
                  }}
                  onPress={() => {
                    this.props.navigation.goBack()
                  }}
                >
                  <Icon name='times' size={Sizes.s60} color='#ffffff' />

                </TouchableOpacity>

                {
                  (this.state.multiple && this.state.image.length) > 0 &&
                  <View
                    style={{
                      flex: 0,
                      position: 'absolute',
                      top: Sizes.s60,
                      right: Sizes.s40,
                      flexDirection: 'row'
                    }}

                  >
                    <Text
                      style={{
                        fontSize: Sizes.s40,
                        color: '#ffffff',
                        paddingHorizontal: Sizes.s20
                      }}
                    >
                      {`(${this.state.image.length} ảnh)`}
                    </Text>
                    <TouchableOpacity
                      onPress={async () => {
                        await this.setState({ loading: true })
                        for (const item of this.state.image) {
                          await CameraRoll.save('file://' + item.uri, 'photo')
                        }
                        this.props.navigation.state.params.returnData(
                          {
                            selectedImage: this.state.image
                          }
                        )
                        this.props.navigation.goBack()
                      }}
                    >
                      <Icon name='paper-plane' size={Sizes.s60} color='#ffffff' />
                    </TouchableOpacity>

                  </View>
                }
                {
                  (this.state.multiple && this.state.image.length) > 0 &&
                  <TouchableOpacity
                    onPress={() => {
                      let list = []
                      for (const item of this.state.image) {
                        list.push({
                          label: '',
                          url: item.uri
                        })
                      }
                      let index = list.findIndex(item => item.url.toString() === this.state.image[this.state.image.length - 1].uri.toString())
                      this.imageSlide.current.open(index, list)
                    }}
                    style={{
                      width: Sizes.s100,
                      height: Sizes.s100,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      position: "absolute",
                      bottom: Sizes.s50,
                      alignSelf: 'flex-start',
                      backgroundColor: 'white',
                      left: Sizes.s50,
                      borderWidth: 1,
                      borderColor: '#ccc'
                    }}
                  >
                    <Image
                      style={{
                        width: '100%',
                        height: '100%'
                      }}
                      source={{
                        uri: this.state.image[this.state.image.length - 1].uri
                      }}
                    />
                  </TouchableOpacity>
                }
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    position: "absolute",
                    bottom: Sizes.s40,
                    alignSelf: 'center'
                  }}>
                  <TouchableOpacity
                    onPress={() => this.takePicture(camera)}
                    style={{
                      alignSelf: 'center',
                      borderWidth: Sizes.s10,
                      borderColor: '#ffffff',
                      borderRadius: Sizes.s200,
                      padding: Sizes.s10
                    }}>
                    <View style={{
                      backgroundColor: '#ffffff',
                      aspectRatio: 1,
                      width: Sizes.s80,
                      borderRadius: Sizes.s80
                    }} />
                    {/* <Icon name='dot-circle' size={Sizes.s140} color='#ffffff' /> */}
                  </TouchableOpacity>
                </View>
              </View>

            );
          }}
        </RNCamera>
        <ImageSlide
          ref={this.imageSlide}
          backgroundColor='#ffffff'
        />
      </View>
    );
  }
}

const PendingView = () => (
  <View
    style={{
      width: '100%',
      flex: 1,
      backgroundColor: '#ccc',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Waiting...</Text>
  </View>
);


const stylesTakePicture = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    backgroundColor: 'red'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

})





