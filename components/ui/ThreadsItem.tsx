import { useColorScheme, StyleSheet, Pressable, View } from "react-native";
import React from "react";
import {
  Ionicons,
  Feather,
  AntDesign,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import { timeAgo } from "../../utils/timeAgo";

import { Text } from "../Themed";
import { Thread } from "../../models/threads";
import { Image } from "expo-image";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function ThreadsItem({
  thread,
}: {
  thread: Thread;
}): JSX.Element {
  return (
    <Pressable style={styles.container}>
      <PostLeftSide thread={thread} />
      <View style={{ flex: 1, gap: 6 }}>
        <PostHeading
          name={thread.author.name}
          createdAt={thread.createdAt}
          verified={thread.author.verified}
        />
        <Text>{thread.content}</Text>
        {thread.image && (
          <Image
            source={thread.image}
            style={{ width: "100%", minHeight: 300, borderRadius: 10 }}
            placeholder={blurhash}
            contentFit="cover"
            transition={500}
          />
        )}
        <BottomIcons />
        <PostFooter
          repliesCount={thread.repliesCount}
          likesCount={thread.likesCount}
        />
      </View>
    </Pressable>
  );
}

const PostLeftSide = ({ thread }: { thread: Thread }): JSX.Element => {
  const currentTheme = useColorScheme();
  const borderColor = currentTheme === "light" ? "#00000020" : "#ffffff20";

  return (
    <View style={{ justifyContent: "space-between" }}>
      <Image
        source={thread.author.photo}
        style={styles.image}
        placeholder={blurhash}
        contentFit="cover"
        transition={500}
      />
      <View
        style={{
          borderWidth: 1,
          alignSelf: "center",
          borderColor: borderColor,
          flexGrow: 1,
        }}
      />
      <View
        style={{
          width: 20,
          alignItems: "center",
          alignSelf: "center",
          gap: 3,
        }}
      >
        {[1, 2, 3].map((index) => (
          <Image
            key={index}
            source={thread.replies[index - 1]?.author.photo}
            style={{ width: index * 9, height: index * 9, borderRadius: 15 }}
            placeholder={blurhash}
            contentFit="cover"
            transition={500}
          />
        ))}
      </View>
    </View>
  );
};

const PostHeading = ({
  name,
  createdAt,
  verified,
}: {
  name: string;
  createdAt: string;
  verified: boolean;
}): JSX.Element => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flexGrow: 1,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Text style={{ fontWeight: "500" }}>{name}</Text>
        {verified && (
          <MaterialIcons name="verified" size={14} color="#60a5fa" />
        )}
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Text style={{ color: "gray" }}>{timeAgo(createdAt)}</Text>
        <Feather name="more-horizontal" size={14} color="gray" />
      </View>
    </View>
  );
};

const PostFooter = ({
  repliesCount,
  likesCount,
}: {
  repliesCount: number;
  likesCount: number;
}): JSX.Element => {
  return (
    <Text style={{ color: "gray" }}>
      {repliesCount} replies · {likesCount} likes
    </Text>
  );
};

const BottomIcons = (): JSX.Element => {
  const iconSize = 20;
  const currentTheme = useColorScheme();
  const iconColor = currentTheme === "dark" ? "white" : "black";

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      <FontAwesome name="heart-o" size={iconSize} color={iconColor} />
      <Ionicons name="chatbubble-outline" size={iconSize} color={iconColor} />
      <AntDesign name="retweet" size={iconSize} color={iconColor} />
      <Feather name="send" size={iconSize} color={iconColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 6,
    paddingBottom: 30,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
