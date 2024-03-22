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
import { Platform } from "react-native";
import ImagePickerComp from "../../components/ImagePickerComp";
import Cart from "../../components/Cart";

export default function DonationEnterScreen({navigation, route}) {

    const [expDateVisible, setExpDateVisible]=useState(false)

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
        let obj={}
        if (category=='Food'){
            obj={
                id:Math.random(0,10000),
                title:title,
                type:mealType,
                servings:servings,
                images:images,
            }
        }
        if (category=='Clothes'){
            obj={
                id:Math.random(0,10000),
                title:title,
                season:clothesSeason,
                gender:clothesGender,
                size:clothesSize,
                quality:clothesQuality,
                images:images,
            }
        }
        if (category=='Medicine'){
            obj={
                id:Math.random(0,10000),
                title:title,
                type:medicineType,
                quantity:medicineQuantity,
                exp:medicineExp,
            }
        }
        if (category=='Ration'){
            obj={
                id:Math.random(0,10000),
                title:title,
                quantity:rationQuantity,
                images:images,
            }
        }
        setItems(prev=>[...prev,obj])
        console.log(items.length)
        clearForm()
    }

    const clearForm = ()=>{
        setTitle('')
        setMealType('')
        setServings(0)
        setClothesSeason('')
        setClothesGender('')
        setClothesSize('')
        setClothesQuality(0)
        setMedicineType('')
        setMedicineQuantity(0)
        setMedicineExp(new Date())
        setRationQuantity(0)
        setImages([])
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

    const onExpDateChange = (event, selectedDate) => {
        setExpDateVisible(false);
        const currentDate = selectedDate;
        setMedicineExp(currentDate);
    };

    const switchScreen = ()=>{
        navigation.navigate('DonationTimeLocationPicker', {
            items:items,
            category:category
        })
    }

    const populateData = (index)=>{
        setTitle(items[index].title)
        if (category=='Food'){
            setMealType(items[index].type)
            setServings(items[index].servings)
        }
        if (category=='Clothes'){
            setClothesSeason(items[index].season)
            setClothesGender(items[index].gender)
            setClothesSize(items[index].size)
            setClothesQuality(items[index].quality)
        }
        if (category=='Medicine'){
            setMedicineType(items[index].type)
            setMedicineQuantity(items[index].quantity)
            setMedicineExp(items[index].exp)
        }
        if (category=='Ration'){
            setRationQuantity(items[index].quantity)
        }
        setImages(items[index].images)
        
        
    }

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
    <ScrollView style={styles.container} automaticallyAdjustKeyboardInsets={true}>
        <Cart
            items={items}
            removeItem={removeItem}
            onPress={populateData}

        />
        
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
                    onChange={rationQuantityHandler}
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
                    {
                        Platform.OS=='android' &&
                        <Pressable style={{marginLeft:8}} onPress={()=>setExpDateVisible(true)}>
                            <View style={{height:40, paddingHorizontal:32, alignItems:"center", justifyContent:"center", borderRadius:8, backgroundColor:'#F5F5F5'}}>
                            <Text style={{color:'black', fontWeight:'bold'}}>{medicineExp.getDate()}-{medicineExp.getMonth()+1}-{medicineExp.getFullYear()}</Text>
                            </View>
                        </Pressable>
                    }
                    {(Platform.OS!='android' || expDateVisible) && 
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={medicineExp}
                            mode={'date'}
                            is24Hour={true}
                            onChange={onExpDateChange}      
                        />
                    }
                </View>
            </View>
        }
        {
            category != 'Medicine' &&
            <View style={styles.imageContainer}>
                <ImagePickerComp
                    title={"Images"}
                    images={images}
                    setter={setImages}
                    imageLimit={3}
                    minImages={1}
                    // error={verificationImagesError}
                />
            </View>
        }
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
                <Pressable onPress={switchScreen}>
                    <View style={[styles.addItemBtn, {borderWidth:0, backgroundColor:ColorPallete.mediumBlue}]}>
                        <Text style={[styles.addItemBtnTitle, {color:ColorPallete.screenBg}]}>Next</Text>
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