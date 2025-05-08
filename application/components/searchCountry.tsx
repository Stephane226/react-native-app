import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  Keyboard,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from 'expo-blur';


const countries = [
  "Burkina Faso",
  "Côte d'Ivoire",
  "Sénégal",
  "Nigeria",
  "Ghana",
  "Mali",
  "Togo",
  "Benin",
  "Niger",
  "Cameroon",
  "Côte d'Ivoire",
  "Sénégal",
  "Nigeria",
  "Ghana",
  "Mali",
  "Togo",
  "Benin",
  "Niger",
  "Cameroon",
  "Côte d'Ivoire",
  "Sénégal",
  "Nigeria",
  "Ghana",
  "Mali",
  "Togo",
  "Benin",
  "Niger",
  "Cameroon",
];

export default function SearchCountry() {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(countries);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (text: string) => {
    setSearch(text);
    const filteredList = countries.filter((item) =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(filteredList);
  };

  const handleSearchSubmit = () => {
    Keyboard.dismiss();
    setIsFocused(false);
  };

  const handleCloseDropdown = () => {
    setSearch("");
    setFiltered(countries);
    setIsFocused(false);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Rechercher un pays..."
          value={search}
          onChangeText={handleSearch}
          style={styles.input}
          placeholderTextColor="#888"
          onSubmitEditing={handleSearchSubmit}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 100)}
        />
        <TouchableOpacity
          style={styles.iconWrapper}
          activeOpacity={0.7}
          onPress={isFocused ? handleCloseDropdown : handleSearchSubmit}
        >
          <Ionicons
            name={isFocused ? "close" : "search"}
            size={20}
            color="white"
          />
        </TouchableOpacity>
      </View>

      {/* Filtered List only on focus */}
 
{isFocused && (
  <BlurView intensity={30} tint="light" style={styles.dropdown}>
    <FlatList
      data={filtered}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <View style={styles.countryItem}>
          <Text style={styles.countryText}>{item}</Text>
        </View>
      )}
      ListEmptyComponent={
        <Text style={styles.noResults}>Aucun pays trouvé</Text>
      }
    />
  </BlurView>
)}


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    position: "relative",
  },

 
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flex: 1,
    fontSize: 14,
  },
  iconWrapper: {
    backgroundColor: "#1E90FF",
    borderRadius: 999,
    padding: 12,
    marginLeft: 10,
    elevation: 3,
  },
  dropdown: {
    position: "absolute",
    top: 60,
    width: "100%",
    backgroundColor: "#ffffffa8",
    zIndex: 10,
    width:600,
  paddingLeft:10,
    elevation: 4,
    borderRadius: 8,

    
  },




  countryItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  countryText: {
    fontSize: 16,
  },
  noResults: {
    textAlign: "center",
    marginTop: 20,
    color: "#888",
    fontStyle: "italic",
  },
});
