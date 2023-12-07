import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import ColorPallete from "../../constants/ColorPallete";
import ImprovInput from "../../components/ImprovInput";
import StateButton from "../../components/StateButton";
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialIcons } from '@expo/vector-icons';


export default function DonationEnterScreen({navigation, route}) {
    const [foodType, setFoodType] = useState('')

    const [selected, setSelected] = useState("");
    const [selectedCauses, setSelectedCauses] = useState([]);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };



    const category=route.params.donationCategory

    const foodTypeHandler = (type)=>{
        setFoodType(type)
    }
    
    useEffect(()=>{
        navigation.setOptions({
            title: category
        })
    },[])

  return (
    <View style={styles.container}>
        {/* <Text style={styles.title}>Type</Text>
        <View style={styles.typeContainer}>
            <StateButton
              title={'Non Veg'}
              return={'Non Veg'}
              onPress={foodTypeHandler}
              btnStyle={{marginRight:4, padding:16, borderColor:ColorPallete.lightTextColor}}

              selected={
                foodType === 'Non Veg' &&
                {bgColor:ColorPallete.lightBlue}
              }
            />
            <StateButton
              title={'Veg'}
              return={'Veg'}
              onPress={foodTypeHandler}
              btnStyle={{padding:16, borderColor:ColorPallete.lightTextColor}}

              selected={
                foodType === 'Veg' &&
                {bgColor:ColorPallete.lightBlue}
              }
            />
        </View> */}

        <View style={styles.inputContainer}>
            <ImprovInput
                tag={'Title'}
                maxLength={50}
                liveLength={true}
            />
        </View>
        
        
        <View style={styles.choicesContainer}>
            <View style={styles.mealType}>
                <SelectList 
                    setSelected={(val) => setSelected(val)} 
                    data={['Produce', 'Dairy', 'Non-Perishable', 'Beverages', 'Meat', 'Desserts']} 
                    save="value"
                    search={false}
                    placeholder="Meal Type"
                    arrowicon={
                        <MaterialIcons name="chevron-right" size={24} color={ColorPallete.lightBlueTwo} />
                    }
                    boxStyles={{
                        backgroundColor:ColorPallete.mediumBlue,
                        borderWidth:0,
                        alignItems:'center',
                    }}
                    inputStyles={{
                        color:ColorPallete.lightBlueTwo,
                        fontWeight:'bold'
                    }}
                />
            </View>
            <View style={styles.contents}>
                <MultipleSelectList 
                    setSelected={(val) => setSelectedCauses(val)} 
                    data={['Produce', 'Dairy', 'Non-Perishable', 'Beverages', 'Meat', 'Desserts']} 
                    save="value"
                    placeholder="Contents"
                    search={false}
                    label="Causes"
                    arrowicon={
                        <MaterialIcons name="chevron-right" size={24} color={ColorPallete.lightBlueTwo} />
                    }
                    boxStyles={{
                        backgroundColor:ColorPallete.mediumBlue,
                        borderWidth:0,
                        alignItems:'center',
                        
                    }}
                    inputStyles={{
                        color:ColorPallete.lightBlueTwo,
                        fontWeight:'bold'
                    }}
                />
            </View>
        </View>


        <View>
            <Button title="Show Date Picker" onPress={showDatePicker} />
            <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
        />
        </View>
        
    </View>
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
        // fontSize:16,
        marginBottom:8,
        fontWeight:'bold',

    },
    typeContainer:{
        flexDirection:"row",


    },
    inputContainer:{
        marginTop:-16,
        marginBottom:16,
    },
    mealType:{
        flex:1,
        marginRight:8,

    },
    contents:{
        flex:1,


    },
    choicesContainer:{
        flexDirection:'row',
        marginBottom:16,
        
    }

})