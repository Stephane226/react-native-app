// components/GeneralLayout.tsx
import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";


import BottomNav from "../components/bottomNav";

type Props = {
  children?: ReactNode;
};

export default function GeneralLayout({ children }: Props) {
  return (
    <View style={styles.container}>
      {children}
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom:60,
    flex: 1,
  },
});
