import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MLKitOcr from 'react-native-mlkit-ocr';
import { parseMedicationText } from './utils/extractMedicineInfo';
import { router } from 'expo-router';


export default function ScanMedicineScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  const pickImageFromGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'Please grant media access.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({ base64: true });

    if (!result.canceled && result.assets?.[0]?.base64) {
      setImageUri(result.assets[0].uri);
      handleOCR(result.assets[0].base64);
    }
  };

  
  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'Please grant camera access.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      extractText(uri);
    }
  };

  const extractText = async (uri: string) => {
    setLoading(true);
    try {
      const blocks = await MLKitOcr.detectFromFile(uri);
      const combinedText = blocks.map((block) => block.text).join('\n');
      extractDataAndRoutToMainScreen(combinedText);
    } catch (err) {
      console.error('OCR error:', err);
      Alert.alert('OCR Failed', 'Could not extract text.');
    }
  };

  const handleOCR = async (base64: string) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('base64Image', `data:image/jpeg;base64,${base64}`);
      formData.append('language', 'eng');

      const res = await fetch('https://api.ocr.space/parse/image', {
        method: 'POST',
        headers: {
          apikey: 'helloworld', // free demo key
        },
        body: formData,
      });

      const data = await res.json();

      console.log({
        error: data?.IsErroredOnProcessing,
        message: data?.ErrorMessage,
        text: data?.ParsedResults?.[0]?.ParsedText,
      });

      const parsed = data?.ParsedResults?.[0]?.ParsedText || 'No text found';
      extractDataAndRoutToMainScreen(parsed);
    } catch (err) {
      console.error('OCR Error:', err);
      Alert.alert('Error', 'Failed to extract text.');
    } finally {
      setLoading(false);
    }
  };

  const extractDataAndRoutToMainScreen = async (parsed: string) => {
    console.log('parsed text is here', parsed)
      const extractedData = await parseMedicationText(parsed);
      console.log('extracteddata,', extractedData);
      setImageUri(null);
      setLoading(false);
      router.push({
        pathname: '/ManuallyAdd',
        params: {
          medicineType: extractedData.medicineType,
          medicineName: extractedData.medicineName,
          frequency: extractedData.frequency ?? '',
          quantity: extractedData.quantity ?? '',
        },
      });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
                <TouchableOpacity style={styles.addButton} onPress={takePhoto}>
            <Text style={styles.addButtonText}>📸 Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.addButton} onPress={pickImageFromGallery}>
            <Text style={styles.addButtonText}>🖼️ Pick from Gallery</Text>
          </TouchableOpacity>
          </View>


<View style={styles.imageContainer}>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      {loading && <ActivityIndicator size="large" color="#4A235A" />}

  
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      paddingTop: 50,
      backgroundColor: "#fff",
    },
    imageContainer: {
      marginBottom: 150,
      paddingLeft: 20,
      backgroundColor: "#fff",
    },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D63384',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  image: {
    width: 350,
    height: 200,
    marginVertical: 20,
    borderRadius: 10,
  },
  textContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    elevation: 2,
  },
  addButton: {
    backgroundColor: '#f8c6d2',
    padding: 22,
    top: '18%',
    width: '100%',
    marginTop: 15,
    marginBottom: 4,
    alignSelf: 'flex-start',
    borderRadius: 10,
    paddingHorizontal: 35,
  },
  addButtonText: {
    fontWeight: 'bold',
    color: '#4d004d',
    left: 20,
  },
  label: {
    fontWeight: '600',
    marginBottom: 5,
    color: '#4A235A',
  },
  extracted: {
    color: '#333',
  },
});
