import { Text } from "react-native";

export default function NgoDetailsScreen({route}) {
  return (
    <Text>{route.params.title}</Text>
  )
}
