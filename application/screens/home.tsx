// screens/Home.tsx
import React from "react";
import { Text, View } from "react-native";
import GeneralLayout from "../layouts/generalLayout";

import SearchCountry from "../components/searchCountry";
import LeadersRow from "../components/leadersRow";
import Carousel from "../components/carousel";
import Menu from "../components/menu";

export default function Home() {
  return (
    <GeneralLayout>
     <SearchCountry />
      <LeadersRow />
      <Carousel />
      <Menu />
    </GeneralLayout>
  );
}
