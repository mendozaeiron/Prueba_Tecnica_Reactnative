import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductDetailsScreen = ({ route }: any) => {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text>{product.description}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  image: { width: '100%', height: 300, resizeMode: 'contain' },
  title: { fontSize: 24, marginBottom: 10 },
  price: { fontSize: 20, color: 'green', marginTop: 10 },
});

export default ProductDetailsScreen;
