import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const leaders = [
  {
    name: "Thomas Sankara",
    image: "https://www.blackpast.org/wp-content/uploads/2024/08/Thomas_Sankara.jpeg",
  },
  {
    name: "Nelson Mandela",
    image: "https://i.natgeofe.com/n/714a154d-2b89-4606-8d78-10cad2aa1c62/nelson-mandela-09060209807.jpg",
  },
  {
    name: "Patrice Lumumba",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJBUXZqCNoc9drEse4YwKrT2wBycWjF3Tj7jg3PED_KWak5wJtXr0IGtBIfa0LTon0LLY&usqp=CAU",
  },
  {
    name: "Muhammar Khadafi",
    image: "https://static.wikia.nocookie.net/theloudhousefanon/images/a/a3/Muammar-al-qaddafi-gettyimages-108501512.jpg/revision/latest?cb=20231105084155",
  },
];

export default function LeadersRow() {
  return (
    <View style={styles.container}>
      {leaders.map((leader, index) => (
        <View key={index} style={styles.profile}>
          <Image source={{ uri: leader.image }} style={styles.image} />
          <Text style={styles.name}>{leader.name}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 12,
   marginBottom: 20
  },
  profile: {
    alignItems: "center",
    width: 70,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: "cover",
  },
  name: {
    marginTop: 6,
    fontSize: 12,
    textAlign: "center",
  },
});
