import { observer } from 'mobx-react';
import * as React from 'react';
import { Button, StyleSheet } from 'react-native';

import { NiceLine } from '../components/nice-line';
import { ShoppinglistsList } from '../components/shoppinglists-list';
import { Text, View } from '../components/Themed';
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
      <NiceLine />
      <View style={styles.mainView}>
      <ShoppinglistsList onShoppinglistClicked={(shoppinglistId) => {
        navigation.navigate("Shoppinglist", {
          shoppinglistId: shoppinglistId
        })
      }} />
      </View>
      <View style={styles.footerArea}>
        <Button title="Create shoppinglist" onPress={() => {
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
    fontSize: 35,
    fontWeight: 'bold',
  },
  headerBox: {
    height: 100,
    alignItems: "center",
    justifyContent: "center"
  },
  footerArea: {
    flexDirection: "row",
    height: 70,
    alignItems: "center",
    justifyContent: "center"
  },
  mainView: {
    flex: 1
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
