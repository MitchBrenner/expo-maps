import { locationList } from "@/LocationList";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useImage } from "expo-image";
import { AppleMaps } from "expo-maps";
import { AppleMapsMapType } from "expo-maps/build/apple/AppleMaps.types";
import { useRef, useState } from "react";
import { Button, Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const ref = useRef<AppleMaps.MapView>(null);
  const bottom = useBottomTabBarHeight();
  const [locationIndex, setLocationIndex] = useState(0);
  const image = useImage(
    "https://cdn.wiscweb.wisc.edu/wp-content/uploads/sites/83/2018/02/High-Res-Bucky-768x768.png",
    {
      onError(error) {
        console.error("Error loading image:", error);
      },
    }
  );

  const rederMapControls = () => (
    <>
      <View style={{ flex: 8 }} pointerEvents="none" />
      <View style={styles.controlsContainer}>
        <Button title="Prev" onPress={() => handleChangeWithRef("prev")} />
        <Button title="Next" onPress={() => handleChangeWithRef("next")} />
      </View>
    </>
  );

  function handleChangeWithRef(direction: "next" | "prev") {
    const newIndex = locationIndex + (direction === "next" ? 1 : -1);
    const nextLocation = locationList[newIndex];

    ref.current?.setCameraPosition({
      coordinates: {
        latitude: nextLocation.stores[0].point[0],
        longitude: nextLocation.stores[0].point[1],
      },
      zoom: 12,
    });

    setLocationIndex(newIndex);
  }

  if (Platform.OS === "ios") {
    return (
      <>
        <AppleMaps.View
          ref={ref}
          style={StyleSheet.absoluteFill}
          cameraPosition={{
            coordinates: {
              latitude: locationList[locationIndex].stores[0].point[0],
              longitude: locationList[locationIndex].stores[0].point[1],
            },
            zoom: 12,
          }}
          markers={markersApple}
          annotations={[
            {
              coordinates: { latitude: 49.2597, longitude: -123.1207 },
              title: "BUCKY",
              // text: "Expo HQ",
              textColor: "white",
              backgroundColor: "black",
              icon: image ? image : undefined,
            },
          ]}
          properties={{
            isTrafficEnabled: false,
            mapType: AppleMapsMapType.STANDARD,
            selectionEnabled: true,
          }}
          polylines={[
            {
              color: "blue",
              width: 5,
              coordinates: [
                { latitude: 49.2597, longitude: -123.1207 },
                { latitude: 49.268034, longitude: -123.154819 },
                { latitude: 49.286036, longitude: -123.12303 },
                { latitude: 49.311879, longitude: -123.079241 },
              ],
            },
          ]}
          onMapClick={(e) => {
            console.log(JSON.stringify({ type: "onMapClick", e }, null, 2));
          }}
          onMarkerClick={(e) => {
            console.log(JSON.stringify({ type: "onMarkerClick", e }, null, 2));
          }}
          onCameraMove={(e) => {
            console.log(JSON.stringify({ type: "onCameraMove", e }, null, 2));
          }}
          onPolylineClick={(e) => {
            console.log(
              JSON.stringify({ type: "onPolylineClick", e }, null, 2)
            );
          }}
        />
        <SafeAreaView
          style={{ flex: 1, paddingBottom: bottom }}
          pointerEvents="box-none" // allow touch events to pass through to the map
        >
          {rederMapControls()}
        </SafeAreaView>
      </>
    );
    // } else if (Platform.OS === "android") {
    //   return <GoogleMaps.View style={{ flex: 1 }} />; // for this example, I did not set up the API key
    // } else {
    //   return <Text>Maps are only available on Android and IOS</Text>;
  }
}

const styles = StyleSheet.create({
  controlsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
});

const markersApple = [
  // {
  //   coordinates: { latitude: 49.259133, longitude: -123.10079 },
  //   title: "49th Parallel Café & Lucky's Doughnuts - Main Street",
  //   tintColor: "brown",
  //   systemImage: "cup.and.saucer.fill",
  // },
  {
    coordinates: { latitude: 49.268034, longitude: -123.154819 },
    title: "49th Parallel Café & Lucky's Doughnuts - 4th Ave",
    tintColor: "brown",
    systemImage: "cup.and.saucer.fill",
  },
  {
    coordinates: { latitude: 49.286036, longitude: -123.12303 },
    title: "49th Parallel Café & Lucky's Doughnuts - Thurlow",
    tintColor: "brown",
    systemImage: "cup.and.saucer.fill",
  },
  {
    coordinates: { latitude: 49.311879, longitude: -123.079241 },
    title: "49th Parallel Café & Lucky's Doughnuts - Lonsdale",
    tintColor: "brown",
    systemImage: "cup.and.saucer.fill",
  },
  {
    coordinates: {
      latitude: 49.27235336018808,
      longitude: -123.13455838338278,
    },
    title: "A La Mode Pie Café - Granville Island",
    tintColor: "orange",
    systemImage: "fork.knife",
  },
];
