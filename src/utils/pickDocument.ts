import * as DocumentPicker from 'expo-document-picker';

const pickDocument = async () => {
  const result = await DocumentPicker.getDocumentAsync({
    copyToCacheDirectory: true,
    type: 'audio/*',
  });

  if (result.type === 'success') {
    return result;
  }
};

export default pickDocument;
