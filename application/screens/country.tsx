import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import GeneralLayout from "../layouts/generalLayout";
import CountryLoader from '../loaders/countryLoader'
const countryData = {
  name: "Burkina Faso",
  description:
    "Burkina Faso is a landlocked country in West Africa. It is known for its rich culture, music, and traditions.",
  image: "https://eiti.org/sites/default/files/styles/full_height_hero_desktop/public/2022-03/Burkina_Faso_shutterstock_1424095778.jpg?itok=cGPf5FKU",
  gallery: [
    "https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_267,q_40,w_400/hotelier-images/5b/26/258d1a23b5904c50fdd8f822e1cba8a492c9bba920d34003aaa9f53ae8a5.jpeg",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/645079701.jpg?k=c69671ea37ddc0fa148753193f925226820c143555dccda18b936c3a3ef7bbd4&o=&hp=1",
    "https://hotelcms-contents-live.almosafer.com/v2/9d6a3ecb-f00d-4d34-975a-9d20b9016be5.JPEG",
    "https://media-cdn.tripadvisor.com/media/photo-s/09/33/85/73/laico-ouaga-2000-hotel.jpg",
  ],
  details: {
    Capital: "Ouagadougou",
    Population: "21 million",
    Currency: "West African CFA franc",
    Language: "French",
    Independence: "1960",
    President: "Captain Ibrahim Traoré",
    Area: "274,222 km²",
    Continent: "Africa",
    Timezone: "GMT",
    Religion: "Islam & Christianity",
  },
};

export default function Country() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const navigation = useNavigation();

  const handleImagePress = (img: string) => {
    setSelectedImage(img);
    setModalVisible(true);
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
   const timer = setTimeout(() => {
     setLoading(false);
   }, 2000);

   return () => clearTimeout(timer);
 }, []);



  return (
   <GeneralLayout>
       {loading ? (
      <CountryLoader />
    ) : (
      <>
    <View style={styles.container}>
      {/* Header Image */}
      <Image source={{ uri: countryData.image }} style={styles.headerImage} />

      {/* Name and Description */}
      <Text style={styles.title}>{countryData.name}</Text>
      <Text style={styles.description}>{countryData.description}</Text>

      {/* Gallery */}
      <Text style={styles.sectionTitle}>Gallery</Text>
      <FlatList
        data={countryData.gallery}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleImagePress(item)}>
            <Image source={{ uri: item }} style={styles.galleryImage} />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />

      {/* Modal for full-screen image */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => setModalVisible(false)}
        >
          <Image source={{ uri: selectedImage }} style={styles.fullImage} />
        </TouchableOpacity>
      </Modal>

      {/* Details Table */}
      <Text style={styles.sectionTitle}>Country Details</Text>
      <ScrollView style={{height:220, marginBottom:20}}>
      <View style={styles.detailsTable}>
        {Object.entries(countryData.details).map(([key, value]) => (
          <View key={key} style={styles.tableRow}>
            <Text style={styles.tableKey}>{key}</Text>
            <Text style={styles.tableValue}>{value}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
    </View>
     
     </>  )}

    </GeneralLayout>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop:-60
  },
  headerImage: {
    width: "100%",
    height: 250,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
    marginHorizontal: 16,
  },
  description: {
    fontSize: 14,
    color: "#444",
    marginTop: 8,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginVertical: 12,
  },
  galleryImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#000a",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: width - 40,
    height: width - 40,
    resizeMode: "contain",
  },
  detailsTable: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  tableKey: {
    fontWeight: "600",
    color: "#444",
  },
  tableValue: {
    color: "#555",
    textAlign: "right",
    flex: 1,
    marginLeft: 10,
  },
});
