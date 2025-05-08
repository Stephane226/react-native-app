import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const carouselItems = [
  {
    id: 1,
    title: "Burkina Faso",
    description: "La patrie ou la mort nous vaincrons",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Flag_of_Burkina_Faso.svg/1200px-Flag_of_Burkina_Faso.svg.png",
  },
  {
    id: 2,
    title: "Marocco",
    description: "Découvrez les grands leaders africains du passé.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_Morocco.svg/1280px-Flag_of_Morocco.svg.png",
  },
  {
    id: 3,
    title: "Langues Africaines",
    description: "Apprenez les langues parlées à travers le continent.",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/33/Fulfulde.jpg",
  },
];

const ITEM_WIDTH = Dimensions.get("window").width * 0.8;

export default function Carousel() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
      snapToInterval={ITEM_WIDTH + 16}
      decelerationRate="fast"
    >
      {carouselItems.map((item) => (
        <View key={item.id} style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.cardContent}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.description}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Voir plus</Text>
              <Ionicons name="arrow-forward-outline" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 10,
  },
  card: {
    width: ITEM_WIDTH,
    height: 140,
    backgroundColor: "#f1f1f1a6",
    borderRadius: 8,
    flexDirection: "row",
    marginRight: 8,
    overflow: "hidden",
    elevation: 4,
  },
  image: {
    width: "40%",
    height: "100%",
    borderRadius: 8,

  },
  cardContent: {
    width: "60%",
    padding: 10,
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  desc: {
    fontSize: 12,
    color: "#555",
    marginVertical: 4,
  },
  button: {
    backgroundColor: "#333",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 12,
  },
});
