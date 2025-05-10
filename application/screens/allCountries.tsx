import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import countriesData from "../includes/countries.json"; // assume JSON file
import GeneralLayout from "../layouts/generalLayout";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.2;

export default function AllCountries() {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    setFiltered(
      countriesData.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    );
    console.log('dsa')
  }, [search]);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.countryBox}
      onPress={() => navigation.navigate("Country", { country: item })}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.flag }} style={styles.flag} />
      <Text style={styles.name} numberOfLines={1}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );




 



  return (
   <GeneralLayout>

    <View style={styles.container}>
      <TextInput
        placeholder="Rechercher un pays..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
        placeholderTextColor="#888"
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.name}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: 12 }}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>

        </GeneralLayout>

  );



 
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   paddingTop: 50,
   paddingHorizontal:10,
   backgroundColor: "#fff",
 },
 search: {
   backgroundColor: "#f0f0f0",
   marginHorizontal: 16,
   marginBottom: 16,
   paddingHorizontal: 16,
   paddingVertical: 10,
   borderRadius: 12,
   fontSize: 14,
 },
 countryBox: {
   width: ITEM_WIDTH,
   alignItems: "center",
   marginBottom: 20,
   backgroundColor: "#f9f9f9",
   padding: 0,
   borderRadius: 4,
   elevation: 3,
 },
 flag: {
   width: '100%',
   height: 50,
   resizeMode: "cover",
   borderRadius: 4,
   marginBottom: 6,
 },
 name: {
   fontSize: 14,
   marginBottom: 4,
   textAlign: "center",
 },
});
