// components/CountryDetailsLoader.tsx
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function CountryLoader() {
  const shimmer = (style: any) => (
    <ShimmerPlaceholder
      shimmerColors={["#ddd", "#eaeaea", "#ddd"]}
      style={style}
      LinearGradient={LinearGradient}
    />
  );

  return (
    <View style={{ flex: 1 ,marginTop:-60}}>
      {shimmer(styles.headerImage)}
      {shimmer({ ...styles.title, width: 180 })}
      {shimmer({ ...styles.description, height: 60, width: '90%'  })}
      {shimmer({ ...styles.sectionTitle, width: 100 })}

      <View style={{ flexDirection: "row", paddingHorizontal: 16 }}>
        {[1, 2, 3, 4].map((_, i) => (
          <View key={i} style={{ marginRight: 10 }}>
            {shimmer(styles.galleryImage)}
          </View>
        ))}
      </View>

      {shimmer({ ...styles.sectionTitle, width: 140 })}
      <View style={styles.detailsTable}>
        {Array.from({ length: 8}).map((_, i) => (
          <View key={i} style={styles.tableRow}>
            {shimmer({ width: 100, height: 16 })}
            {shimmer({ width: 120, height: 16 })}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 26,
    marginTop: 16,
    marginHorizontal: 16,
  },
  description: {
    marginTop: 8,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  galleryImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  detailsTable: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
});
