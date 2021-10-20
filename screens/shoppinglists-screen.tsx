import { observer } from 'mobx-react';
import * as React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { ShoppinglistsList } from '../components/shoppinglists-list';
import { Button, Text, View } from '../components/Themed';
import { useShoppinglistStore } from '../logic/shoppinglist-repository';
import { RootTabScreenProps } from '../types';

export const ShoppinglistsScreen = observer(({ navigation }: RootTabScreenProps<'TabOne'>) => {
  const shoppinglistStore = useShoppinglistStore()

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <Text style={styles.title}>
          Shoppinglists
        </Text>
      </View>
      <View style={styles.mainView}>
      <ShoppinglistsList onShoppinglistClicked={(shoppinglistId) => {
        navigation.navigate("Shoppinglist", {
          shoppinglistId: shoppinglistId
        })
      }} />
      </View>
      <View style={styles.footerArea}>
        <Button title="Create shoppinglist" style={{
          fontSize: 25,
          marginLeft: 50,
          marginRight: 50,
          paddingBottom: 8,
          paddingTop: 8,
          flex: 1
        }} onPress={() => {
          const newShoppinglist = shoppinglistStore.createShoppinglist()

          navigation.navigate("Shoppinglist", {
            shoppinglistId: newShoppinglist.id
          })
        }} />
      </View>
    </View>
  );
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  headerBox: {
    backgroundColor: "red",
    height: 100,
    alignItems: "center",
    justifyContent: "center"
  },
  footerArea: {
    flexDirection: "row",
    backgroundColor: "blue",
    height: 70,
    alignItems: "center",
    justifyContent: "center"
  },
  mainView: {
    backgroundColor: "green",
    flex: 1
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
