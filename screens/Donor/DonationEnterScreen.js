import { useEffect, useState } from "react";
import { Button, ScrollView, Image, Pressable, StyleSheet, Text, View } from "react-native";
import ColorPallete from "../../constants/ColorPallete";
import ImprovInput from "../../components/ImprovInput";
import StateButton from "../../components/StateButton";
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list'
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import date from 'date-and-time';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';



export default function DonationEnterScreen({navigation, route}) {
    const [item,setItem]=useState({})
    const [items,setItems]=useState([])

    const [title,setTitle]=useState('')
    const [servings,setServings]=useState(0)
    const [mealType,setMealType]=useState('')

    const [imageOne, setImageOne] = useState(null);
    const [imageTwo, setImageTwo] = useState(null);
    const [imageThree, setImageThree] = useState(null);

    const [foodType, setFoodType] = useState('')
    const [selected, setSelected] = useState("");

    const [fromDate, setFromDate] = useState(new Date());
    const [tillDate, setTillDate] = useState(new Date());

    const category=route.params.donationCategory
    useEffect(()=>{
        navigation.setOptions({
            title: category,
        })
    },[])

    const addItem = ()=>{
        const obj={
            id:Math.random(0,10000),
            title:title,
            mealType:mealType,
            servings:servings,
            fromDate:fromDate,
            tillDate:tillDate,
            images:[
                imageOne,
                imageTwo && imageTwo,
                imageThree && imageThree
            ]
        }

        setItems(prev=>[...prev,obj])
    }

    const removeItem = (id)=>{
        setItems(items.filter(i=>i.id!=id))
    }

    const titleHandler = (str) => {
        setTitle(str)
    }

    const servingsHandler = (serv) => {
        setServings(serv)
    }


    const pickImageOne = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.canceled) {
          setImageOne(result.assets[0].uri);
        }
    };
    const pickImageTwo = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.canceled) {
          setImageTwo(result.assets[0].uri);
        }
    };
    const pickImageThree = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.canceled) {
          console.log(result.assets[0].uri);
          setImageThree(result.assets[0].uri);
        }
    };

    const onFromDateChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        // setShow(false);
        setFromDate(currentDate);
    };

    const onTillDateChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        // setShow(false);
        setTillDate(currentDate);
    };

    const foodTypeHandler = (type)=>{
        setFoodType(type)
    }

    // useEffect(()=>{
    //     console.log("from>>>",date.format(fromDate,'ddd, MMM DD YYYY HH:mm:ss'))
    //     console.log("till>>>",date.format(tillDate,'ddd, MMM DD YYYY HH:mm:ss'))
    // },[fromDate,tillDate])

  return (
    <ScrollView style={styles.container}>

        <View style={styles.cartContainer}>
            {
                !items.length ?
                <View style={styles.emptyCartContainer}>
                    <View style={styles.emptyCart}>
                        <MaterialIcons style={{marginBottom:8}} name="add-shopping-cart" size={24} color="black" />
                        <Text style={[styles.title, {textAlign:"center"}]}>No items added</Text>
                        <Text style={[{textAlign:'center'}]}>Start adding some items to donate.</Text>
                    </View>
                </View>
                :
                <View style={styles.nonEmptyCart}>
                    {
                        items.map((i, count)=>(
                            <View key={count} style={styles.cartRow}>
                                <View style={{flexDirection:"row"}}>
                                    <Text style={{marginRight:8,}}>{count+1}.</Text>
                                    <Text style={{fontWeight:'bold',}}>{i.title}</Text>
                                </View>
                                <Pressable 
                                    onPress={()=>removeItem(i.id)}
                                    style={{borderRadius:8, overflow:'hidden'}}>
                                    <Text style={{
                                        color:ColorPallete.screenBg,
                                        padding:4,
                                        paddingHorizontal:8,
                                        backgroundColor:ColorPallete.mediumBlue,
                                        fontWeight:'bold',
                                        fontSize:12,
                                    }}>Remove</Text>
                                </Pressable>                                
                            </View>
                        ))
                    }
                </View>
            }
        </View>

        <View style={styles.inputContainer}>
            <ImprovInput
                tag={'Title'}
                value={title}
                onChange={titleHandler}
                maxLength={50}
                liveLength={true}
            />
        </View>        
        <View style={styles.choicesContainer}>
            <View style={styles.mealType}>
                <SelectList 
                    setSelected={(val) => setMealType(val)} 
                    data={['Produce', 'Dairy', 'Non-Perishable', 'Beverages', 'Meat', 'Desserts']} 
                    save={'value'}
                    search={false}
                    placeholder="Meal Type"
                    arrowicon={
                        <MaterialCommunityIcons name="chevron-down" size={24} color={ColorPallete.screenBg} />
                    }
                    boxStyles={{
                        backgroundColor:ColorPallete.mediumBlue,
                        borderWidth:0,
                        alignItems:'center',
                    }}
                    inputStyles={{
                        color:ColorPallete.screenBg,
                        fontWeight:'bold'
                    }}
                    dropdownStyles={{
                        position:'absolute',
                        top:48,
                        backgroundColor:ColorPallete.screenBg,
                        zIndex:99999
                    }}
                />
            </View>
            <View style={styles.servingsContainer}>
                <ImprovInput
                    tag={'Servings'}
                    value={servings}
                    onChange={servingsHandler}
                    inputMode={'numeric'}
                    // maxLength={50}
                    liveLength={false}
                />
            </View>
        </View>
        <View style={styles.imageContainer}>
            <Text style={styles.title}>Images <Text style={{color:ColorPallete.lightTextColor}}>(1 Min)</Text></Text>
            <View style={styles.imagesContainer}>
                <Pressable onPress={pickImageOne} style={styles.singleImageContainer}>
                    {
                        imageOne ? 
                        <Image style={styles.singleImage} source={{uri:imageOne}} />
                        :
                        <MaterialIcons name="add-circle-outline" size={32} color={ColorPallete.mediumBlue} />
                    }
                </Pressable>
                <Pressable onPress={pickImageTwo} style={styles.singleImageContainer}>
                    {
                        imageTwo ? 
                        <Image style={styles.singleImage} source={{uri:imageTwo}} />
                        :
                        <MaterialIcons name="add-circle-outline" size={32} color={ColorPallete.mediumBlue} />
                    }
                </Pressable>
                <Pressable onPress={pickImageThree} style={styles.singleImageContainer}>
                    {
                        imageThree ? 
                        <Image style={styles.singleImage} source={{uri:imageThree}} />
                        :
                        <MaterialIcons name="add-circle-outline" size={32} color={ColorPallete.mediumBlue} />
                    }
                </Pressable>
                
            </View>
        </View>
        <View style={styles.dateTimeConatiner}>
            <View style={[styles.fromContainer]}>
                <Text style={styles.title}>From</Text>
                <View style={styles.fromInnerContainer}>
                    <View style={styles.dateContainer}>
                        <View style={styles.iconContainer}>
                            <MaterialIcons name="calendar-today" size={24} color={ColorPallete.screenBg} />
                        </View>
                        <View style={styles.dateTimeBtn}>
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={fromDate}
                                mode={'date'}
                                is24Hour={true}
                                onChange={onFromDateChange}
                            />
                        </View>                
                    </View>
                    <View style={styles.dateContainer}>
                        <View style={styles.iconContainer}>
                            <MaterialIcons name="access-time" size={24} color={ColorPallete.screenBg} />
                        </View>
                        <View style={styles.dateTimeBtn}>
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={fromDate}
                                mode={'time'}
                                is24Hour={true}
                                onChange={onFromDateChange}
                                
                            />
                        </View>                
                    </View>
                </View>
            </View>
            <View style={[styles.fromContainer]}>
                <Text style={styles.title}>Till</Text>
                <View style={styles.fromInnerContainer}>
                    <View style={styles.dateContainer}>
                        <View style={styles.iconContainer}>
                            <MaterialIcons name="calendar-today" size={24} color={ColorPallete.screenBg} />
                        </View>
                        <View style={styles.dateTimeBtn}>
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={tillDate}
                                mode={'date'}
                                is24Hour={true}
                                onChange={onTillDateChange}
                            />
                        </View>                
                    </View>
                    <View style={styles.dateContainer}>
                        <View style={styles.iconContainer}>
                            <MaterialIcons name="access-time" size={24} color={ColorPallete.screenBg} />
                        </View>
                        <View style={styles.dateTimeBtn}>
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={tillDate}
                                mode={'time'}
                                is24Hour={true}
                                onChange={onTillDateChange}
                                
                            />
                        </View>                
                    </View>
                </View>
            </View>
        </View>
        

        <View>
            <Pressable onPress={addItem}>
                <View style={styles.addItemBtn}>
                    <Text style={styles.addItemBtnTitle}>Add Item</Text>
                    <MaterialIcons name="add-circle-outline" size={24} color={ColorPallete.mediumBlue} />
                </View>
            </Pressable>
        </View>

        <View>
            <Pressable>
                <View style={[styles.addItemBtn, {borderWidth:0, backgroundColor:ColorPallete.mediumBlue}]}>
                    <Text style={[styles.addItemBtnTitle, {color:ColorPallete.screenBg}]}>Post Donation</Text>
                    <MaterialIcons name="chevron-right" size={24} color={ColorPallete.screenBg} />
                </View>
            </Pressable>
        </View>

        <View style={{
            height:32
        }}>

        </View>

        
    </ScrollView>
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:ColorPallete.screenBg,
        paddingHorizontal:16,
        paddingTop:16,    
    },
    cartContainer:{
        minHeight:140,
        // padding:8,
        marginBottom:24,
        backgroundColor:ColorPallete.lightBlue,
        borderRadius:16,
        

    },
    nonEmptyCart:{
        padding:16
    },
    emptyCartContainer:{
        minHeight:140,
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
    title:{
        // fontSize:16,
        marginBottom:8,
        fontWeight:'bold',

    },
    typeContainer:{
        flexDirection:"row",


    },
    inputContainer:{
        // marginTop:-16,
        marginBottom:8,
    },
    choicesContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:16,

        // borderWidth:1
        
    },
    mealType:{
        flex:1,
        marginRight:8,
        // marginBottom:-16,

        // borderWidth:1

    },
    servingsContainer:{
        flex:1,


    },
    dateTimeConatiner:{
        marginBottom:16,

        zIndex:-1,
        // borderWidth:1
        

    },
    fromContainer:{
        marginBottom:8,


    },
    fromInnerContainer:{
        flexDirection:'row-reverse',
        justifyContent:'space-between',
        alignItems:'center',




    },
    dateContainer:{
        flexDirection:'row',
        alignItems:"center",
        flex:1,


    },
    iconContainer:{
        backgroundColor:ColorPallete.mediumBlue,
        padding:8,
        borderRadius:8,

    },
    dateTimeBtn:{

    },
    imageContainer:{
        zIndex:-1,
        marginBottom:16,

    },
    imagesContainer:{
        flexDirection:'row',
    },
    singleImageContainer:{
        height:82,
        width:82,
        borderWidth:1,
        borderStyle:'dashed',
        marginRight:8,

        alignItems:'center',
        justifyContent:"center"
    },
    singleImage:{
        height:80,
        width:80,
        // borderWidth:1,
        // marginRight:8,
    },
    addItemBtn:{
        padding:16,
        backgroundColor:ColorPallete.lightBlue,
        // borderWidth:1,
        borderColor:ColorPallete.mediumBlue,
        borderRadius:8,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:8
    },
    addItemBtnTitle:{
        fontWeight:'bold',
        color:ColorPallete.mediumBlue,
        marginRight:8,

    }

})