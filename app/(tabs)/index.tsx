import { StyleSheet, FlatList } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import Lottie from "lottie-react-native";
import { useRef, useContext, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { RefreshControl } from "react-native-gesture-handler";
import { createRandomUser } from "../../utils/dummy-data";
import { ThreadContext } from "../../store/thread-context";
import { Thread } from "../../models/threads";
import ThreadsItem from "../../components/ui/ThreadsItem";
import { ScrollView } from "react-native-virtualized-view";

// const user = createRandomUser();
// console.log(JSON.stringify(user, null, 2));

const renderThreadItem = ({ item }: { item: Thread }) => {
  return <ThreadsItem thread={item} />;
};

export default function TabOneScreen() {
  const animation = useRef<Lottie>(null);

  const threadContext = useContext(ThreadContext);

  const threads: Thread[] = threadContext.threadList;

  // if(threads){
  //   console.log(JSON.stringify(threads[0], null, 2))
  // }

  const [reloading, setReloading] = useState<number>(0);

  useEffect(() => {
    if (reloading != 0) threadContext.reload();
  }, [reloading]);

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 10,
        }}
        refreshControl={
          <RefreshControl
            colors={["transparent"]}
            style={{ backgroundColor: "transparent" }}
            progressBackgroundColor="transparent"
            refreshing={false}
            onRefresh={() => {
              animation.current?.play();
              setReloading(reloading + 1);
            }}
            tintColor={"transparent"}
          />
        }
      >
        <Lottie
          ref={animation}
          autoPlay
          loop={false}
          style={{
            width: 90,
            height: 90,
            backgroundColor: "transparent",
            alignSelf: "center",
          }}
          source={require("../../assets/animation/threads.json")}
          onAnimationFinish={() => {}}
        />

        <FlatList
          data={threads}
          keyExtractor={(item, index) => item.id}
          renderItem={renderThreadItem}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
