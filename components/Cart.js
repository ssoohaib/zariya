import React from "react";
import {FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import ColorPallete from "../constants/ColorPallete";
import { MaterialIcons } from '@expo/vector-icons';

export default function Cart(props) {

    const itemCard = (itemData)=>{
        return(
            <Pressable onPress={()=>props.onPress(itemData.index)}>
                <View style={styles.cardContainer}>
                    <View style={styles.cardUp}>
                        <Pressable style={styles.delBtn} onPress={()=>props.removeItem(itemData.item.id)}>
                            <MaterialIcons
                            // style={{ marginBottom: 8 }}
                                name="delete"
                                size={20}
                                color="white"
                            />
                        </Pressable>
                    </View>
                        <Text style={{color:'white', marginBottom:4}}>{itemData.index+1}.</Text>
                        <Text style={[styles.cardDown,{color:'white'}]}>{itemData.item.title.slice(0,5)}</Text>
                </View>
            </Pressable>
        )
    }

  return (
    <View style={styles.cartContainer}>
      {!props.items.length ? (
        <View style={styles.emptyCartContainer}>
          <View style={styles.emptyCart}>
            <MaterialIcons
              style={{ marginBottom: 8 }}
              name="add-shopping-cart"
              size={24}
              color="black"
            />
            <Text style={[styles.title, { textAlign: "center" }]}>
              No items added.
            </Text>
          </View>
        </View>
      ) : (
        <FlatList
            data={props.items}
            keyExtractor={(item) => item.id}
            renderItem={itemCard}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    cartContainer:{
        // height:140,
        marginBottom:24,
        backgroundColor:ColorPallete.lightBlue,
        borderRadius:16,
        padding:16,
        justifyContent:'center',  

    },
    nonEmptyCart:{
        padding:16
    },
    emptyCartContainer:{
        height:90,
        alignItems:'center',
        justifyContent:'center',
    },
    emptyCart:{
        width:'60%',
        alignItems:'center'

    },
    cartRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:8,
    },
    cardContainer:{
        height:90, 
        width:90,
        borderWidth:1,
        borderRadius:16,
        padding:8,
        marginRight:16,
        // justifyContent:"space-between",
        backgroundColor:ColorPallete.darkBlue,
        alignItems:'center',
        justifyContent:'center',


    },
    cardUp:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:8,
        alignItems:'center'
    },
    delBtn:{
        position:'absolute',
        top:-16,
        left:28,
        // backgroundColor:ColorPallete.lightBlue,
        backgroundColor:'red',
        padding:4,
        borderRadius:8,
    },
    cardDown:{
        fontSize:16,
        textAlign:'center',
        fontWeight:'bold',

        // borderWidth:1,
    }

})