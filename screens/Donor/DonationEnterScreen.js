import { useEffect, useState } from "react";
import { ScrollView, Image, Pressable, StyleSheet, Text, View } from "react-native";
import ColorPallete from "../../constants/ColorPallete";
import ImprovInput from "../../components/ImprovInput";
import { SelectList } from 'react-native-dropdown-select-list'
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import date from 'date-and-time';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function DonationEnterScreen({navigation, route}) {
    const [items,setItems]=useState([])

    const [title,setTitle]=useState('')

    const [mealType,setMealType]=useState('')
    const [servings,setServings]=useState(0)

    const [clothesSeason,setClothesSeason]=useState('')
    const [clothesQuality,setClothesQuality]=useState(0)
    const [clothesGender,setClothesGender]=useState('')
    const [clothesSize,setClothesSize]=useState('')

    const [rationQuantity,setRationQuantity]=useState(0)

    const [medicineQuantity,setMedicineQuantity]=useState(0)
    const [medicineExp,setMedicineExp]=useState(new Date())
    const [medicineType,setMedicineType]=useState('')

    const [images, setImages] = useState([]);
    const [fromDate, setFromDate] = useState(new Date());
    const [tillDate, setTillDate] = useState(new Date());

    const category=route.params.donationCategory
    useEffect(()=>{
        navigation.setOptions({
            title: category,
        })
    },[])

    const mealsTypeList=['Produce', 'Dairy', 'Non-Perishable', 'Beverages', 'Meat', 'Desserts']

    const clothesSeasonList=['Summer', 'Winter', 'Rainy', 'Spring', 'Autumn', 'All']
    const genderList = ['Male', 'Female', 'Unisex']
    const sizeList = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
    const qualityList=[1,2,3,4,5,6,7,8,9,10]

    const medicineTypesList=['Liquid','Tablet','Capsules','Drops','Crushed','Inhalers']
    

    const addItem = ()=>{
        const obj={
            id:Math.random(0,10000),
            title:title,
            mealType:mealType,
            servings:servings,
            fromDate:fromDate,
            tillDate:tillDate,
            images:images,
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

    const medicineQuantityHandler = (quantity)=>{
        setMedicineQuantity(quantity)
    }

    const rationQuantityHandler = (quantity)=>{
        setRationQuantity(quantity)
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.canceled) {
            setImages(prev=>[...prev,result.assets[0].uri])
        }
    };

    const onFromDateChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setFromDate(currentDate);
    };

    const onTillDateChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setTillDate(currentDate);
    };

    const onExpDateChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setMedicineExp(currentDate);
    };

    const customSelectList = (setter, list, placeholder)=>{
        return(
            <SelectList
                setSelected={(val) => setter(val)} 
                data={list} 
                placeholder={placeholder}
                save={'value'}
                search={false}
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
                    fontWeight:'bold',
                }}
                dropdownStyles={{
                    position:'absolute',
                    top:48,
                    backgroundColor:ColorPallete.screenBg,
                    width:"100%",
                    zIndex:99999,
                }}
            />
        )
    }

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
        {
            category == 'Ration' &&
            <View style={styles.inputContainer}>
                <ImprovInput
                    tag={'Quantity'}
                    value={rationQuantity}
                    onChange={setRationQuantity}
                    inputMode={'numeric'}
                />
            </View> 
        }    
        <View style={styles.choicesContainer}>
            <View style={styles.mealType}>
                {
                    category == 'Food' &&
                    customSelectList(setMealType,mealsTypeList,'Meal Type')
                }
                {
                    category == 'Clothes' &&
                    customSelectList(setClothesSeason,clothesSeasonList,'Season')
                }
                {
                    category == 'Medicine' &&
                    customSelectList(setMedicineType,medicineTypesList,'Type')
                }
            </View>
            <View style={styles.servingsContainer}>
                {
                    category=='Food' &&
                    <ImprovInput
                        tag={'Servings'}
                        value={servings}
                        onChange={servingsHandler}
                        inputMode={'numeric'}
                        liveLength={false}
                    />
                }
                {
                    category == 'Clothes' &&
                    customSelectList(setClothesGender,genderList,'Gender')
                }
                {
                    category == 'Medicine' &&
                    <ImprovInput
                        tag={'Quantity'}
                        value={medicineQuantity}
                        onChange={medicineQuantityHandler}
                        inputMode={'numeric'}
                        liveLength={false}
                    />
                }
            </View>
        </View>
        {
            category == 'Clothes' &&
            <View style={[styles.choicesContainer, {zIndex:-1}]}>
                <View style={styles.mealType}>
                    {
                        customSelectList(setClothesSize,sizeList,'Size')                        
                    }
                </View>
                <View style={styles.servingsContainer}>
                    {
                        customSelectList(setClothesQuality,qualityList,'Quality')
                    }
                </View>
            </View>
        }
        {
            category == 'Medicine' &&
            <View style={styles.expContainer}>
                <Text style={[styles.title,{marginBottom:0, color:ColorPallete.screenBg}]}>Expiration Date</Text>
                <View style={{
                    borderRadius:8,
                    overflow:'hidden',

                }}>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={medicineExp}
                        mode={'date'}
                        is24Hour={true}
                        onChange={onExpDateChange}
                        style={{
                            backgroundColor:ColorPallete.screenBg,
                        }}
                    />
                </View>
            </View>
        }
        {
            category != 'Medicine' &&
            <View style={styles.imageContainer}>
                <Text style={styles.title}>Images <Text style={{color:ColorPallete.lightTextColor}}>(1 Min)</Text></Text>
                <View style={styles.imagesContainer}>
                    <Pressable onPress={pickImage} style={styles.singleImageContainer}>
                        {
                            images[0] ? 
                            <Image style={styles.singleImage} source={{uri:images[0]}} />
                            :
                            <MaterialIcons name="add-circle-outline" size={32} color={ColorPallete.mediumBlue} />
                        }
                    </Pressable>
                    <Pressable onPress={pickImage} style={styles.singleImageContainer}>
                        {
                            images[1] ? 
                            <Image style={styles.singleImage} source={{uri:images[1]}} />
                            :
                            <MaterialIcons name="add-circle-outline" size={32} color={ColorPallete.mediumBlue} />
                        }
                    </Pressable>
                    <Pressable onPress={pickImage} style={styles.singleImageContainer}>
                        {
                            images[2] ? 
                            <Image style={styles.singleImage} source={{uri:images[2]}} />
                            :
                            <MaterialIcons name="add-circle-outline" size={32} color={ColorPallete.mediumBlue} />
                        }
                    </Pressable>
                </View>
            </View>
        }
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
        <View style={styles.btnContainer}>
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
        marginBottom:8,
        fontWeight:'bold',

    },
    typeContainer:{
        flexDirection:"row",


    },
    inputContainer:{
        marginBottom:8,
    },
    choicesContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:16,
        
    },
    mealType:{
        flex:1,
        marginRight:8,

    },
    servingsContainer:{
        flex:1,


    },
    dateTimeConatiner:{
        marginBottom:16,
        zIndex:-10,        

    },
    fromContainer:{
        marginBottom:8,


    },
    fromInnerContainer:{
        flexDirection:'row-reverse',
        justifyContent:'space-between',
        alignItems:'center',

    },
    expContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:16,
        backgroundColor:ColorPallete.mediumBlue,
        padding:8,
        paddingHorizontal:16,
        borderRadius:8,
        zIndex:-1,
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
        zIndex:-9,
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
        
    },
    addItemBtn:{
        padding:16,
        backgroundColor:ColorPallete.lightBlue,
        borderRadius:8,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:8
    },
    addItemBtnTitle:{
        fontWeight:'bold',
        color:ColorPallete.mediumBlue,
        marginRight:4,

    },
    btnContainer:{
        zIndex:-10
    }
})