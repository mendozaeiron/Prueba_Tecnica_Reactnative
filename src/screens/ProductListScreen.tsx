import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { getProducts } from '../services/api';
import { useAuth } from '../context/AuthContext';

const ProductListScreen = ({ navigation }: any) => {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigation.replace('Login');
      return;
    }
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [token]);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <FlatList
      data={products}
      keyExtractor={(item: any) => item.id.toString()}
      renderItem={({ item }: any) => (
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { product: item })}>
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text>{item.title}</Text>
            <Text>${item.price.toFixed(2)}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: { flexDirection: 'row', marginBottom: 10, padding: 10, borderWidth: 1, borderRadius: 5 },
  image: { width: 50, height: 50, marginRight: 10 },
});

export default ProductListScreen;
