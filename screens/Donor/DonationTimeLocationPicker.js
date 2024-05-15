import { Pressable, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from "react-native";
import { useContext, useState } from "react";
import date from 'date-and-time';
import ColorPallete from "../../constants/ColorPallete";
import { SelectList } from 'react-native-dropdown-select-list'
import { AuthContext } from "../../context/AuthContext"
import MyIp from "../../ip";
import SendNotifications from "../../utilities/SendNotifications";



export default function DonationTimeLocationPicker({route, navigation}) {
    const {currentUser, token}=useContext(AuthContext)
    const [city, setCity] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [fromTimeVisible, setFromTimeVisible]=useState(false)
    const [fromDateVisible, setFromDateVisible]=useState(false)
    const [tillTimeVisible, setTillTimeVisible]=useState(false)
    const [tillDateVisible, setTillDateVisible]=useState(false)

    const [fromDate, setFromDate] = useState(new Date());
    const [tillDate, setTillDate] = useState(new Date());

    const handleLoading = () => {
        setIsLoading(!isLoading);
    }

    const onFromDateChange = (event, selectedDate) => {
        setFromDateVisible(false);
        setFromTimeVisible(false);
        const currentDate = selectedDate;
        setFromDate(currentDate);
    };

    const onTillDateChange = (event, selectedDate) => {
        setTillDateVisible(false);
        setTillTimeVisible(false);
        const currentDate = selectedDate;
        setTillDate(currentDate);
    };

    const handlePostDonation = async () => {
        handleLoading();

        const category = route.params.category
        let donation={
            ngoId:"N/A",
            ngoName:"N/A",
            ngoEmail:"N/A",
            ngoContactNumber:"N/A",
            donorEmail:currentUser.email,
            donorContactNumber:currentUser.contactNumber || "N/A",
            donorId:currentUser._id,
            donorName:currentUser.firstName + ' '+ currentUser.lastName,
            donorDp:"N/A",
            donationCategory:category,
            donationStatus:"Pending",
            city:currentUser.city,
            donationDate:date.format(new Date(), 'YYYY/MM/DD HH:mm:ss'),
            donation:{
                from:fromDate,
                till:tillDate,
                items:route.params.items,
            }   
        }

        const formData = new FormData();
        formData.append('payload', JSON.stringify(donation));
        
        if (category !== 'Medicine')
            route.params.items.forEach((item, index) => {
                formData.append('images', {
                uri: item.images[index],
                // type: image.type,
                name: 'items-' + currentUser.email + index +(Math.floor(Math.random() * 10000) + 1) + '.jpg',
                });
            });
        
        // console.log(JSON.stringify(donation, null,1))

        await fetch(`http://${MyIp}:5000/make-donation/${currentUser._id}`, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            navigation.navigate('DonorHome')
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        handleLoading();

        navigation.goBack()
        navigation.goBack()

        SendNotifications('Donation Posted', 'Your donation has been posted', {lol:'lol'})
    }

  return (
    <View style={styles.container}>
        <View style={styles.locationContainer}>
            <Text style={styles.title}>Location</Text>
            <SelectList 
                setSelected={(val) => setCity(val)} 
                data={['Multan', 'Lahore','Islamabad', 'Karachi']} 
                save="value"
                search={false}
                placeholder="Select City"
              />
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
                            {
                                Platform.OS=='android' &&
                                <Pressable style={{marginLeft:8}} onPress={()=>setFromDateVisible(true)}>
                                    <View style={{height:40, paddingHorizontal:32, alignItems:"center", justifyContent:"center", borderRadius:8, backgroundColor:'#F5F5F5'}}>
                                        <Text style={{color:'black', fontWeight:'bold'}}>{fromDate.getDate()}-{fromDate.getMonth()+1}-{fromDate.getFullYear()}</Text>
                                    </View>
                                </Pressable>
                            }
                            {(Platform.OS!='android' || fromDateVisible) && 
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={fromDate}
                                    mode={'date'}
                                    is24Hour={true}
                                    onChange={onFromDateChange}
                                />
                            }
                        </View>                
                    </View>
                    <View style={styles.dateContainer}>
                        <View style={styles.iconContainer}>
                            <MaterialIcons name="access-time" size={24} color={ColorPallete.screenBg} />
                        </View>
                        <View style={styles.dateTimeBtn}>
                            {
                                Platform.OS=='android' &&
                                <Pressable style={{marginLeft:8}} onPress={()=>setFromTimeVisible(true)}>
                                    <View style={{height:40, paddingHorizontal:32, alignItems:"center", justifyContent:"center", borderRadius:8, backgroundColor:'#F5F5F5'}}>
                                        <Text style={{color:'black', fontWeight:'bold'}}>{fromDate.getHours()<10 && 0}{fromDate.getHours()}:{fromDate.getMinutes()<10 && 0}{fromDate.getMinutes()}</Text>
                                    </View>
                                </Pressable>
                            }
                            {(Platform.OS!='android' || fromTimeVisible) && 
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={fromDate}
                                    mode={'time'}
                                    is24Hour={true}
                                    onChange={onFromDateChange}      
                                />
                            }
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
                            {
                                Platform.OS=='android' &&
                                <Pressable style={{marginLeft:8}} onPress={()=>setTillDateVisible(true)}>
                                    <View style={{height:40, paddingHorizontal:32, alignItems:"center", justifyContent:"center", borderRadius:8, backgroundColor:'#F5F5F5'}}>
                                    <Text style={{color:'black', fontWeight:'bold'}}>{tillDate.getDate()}-{tillDate.getMonth()+1}-{tillDate.getFullYear()}</Text>
                                    </View>
                                </Pressable>
                            }
                            {(Platform.OS!='android' || tillDateVisible) && 
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={tillDate}
                                    mode={'date'}
                                    is24Hour={true}
                                    onChange={onTillDateChange}      
                                />
                            }
                            
                        </View>                
                    </View>
                    <View style={styles.dateContainer}>
                        <View style={styles.iconContainer}>
                            <MaterialIcons name="access-time" size={24} color={ColorPallete.screenBg} />
                        </View>
                        <View style={styles.dateTimeBtn}>
                            {
                                Platform.OS=='android' &&
                                <Pressable style={{marginLeft:8}} onPress={()=>setTillTimeVisible(true)}>
                                    <View style={{height:40, paddingHorizontal:32, alignItems:"center", justifyContent:"center", borderRadius:8, backgroundColor:'#F5F5F5'}}>
                                        <Text style={{color:'black', fontWeight:'bold'}}>{tillDate.getHours()<10 && 0}{tillDate.getHours()}:{tillDate.getMinutes()<10 && 0}{tillDate.getMinutes()}</Text>
                                    </View>
                                </Pressable>
                            }
                            {(Platform.OS!='android' || tillTimeVisible) && 
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={tillDate}
                                    mode={'time'}
                                    is24Hour={true}
                                    onChange={onTillDateChange}      
                                />
                            }
                        </View>                
                    </View>
                </View>
            </View>
        </View>
        
        <Pressable onPress={handlePostDonation}>
            <View style={[styles.addItemBtn, {borderWidth:0, backgroundColor:ColorPallete.mediumBlue}]}>
                <Text style={[styles.addItemBtnTitle, {color:ColorPallete.screenBg}]}>Post</Text>
                {isLoading && <ActivityIndicator size="small" color={'white'} />}
                <MaterialIcons name="chevron-right" size={24} color={ColorPallete.screenBg} />
            </View>
        </Pressable>
    </View>
  )
}


const styles=StyleSheet.create({
    container:{
        flex:1,
        padding:16,
        backgroundColor:ColorPallete.screenBg,
    },
    locationContainer:{
        marginBottom:16,
    },
    title:{
        marginBottom:8,
        fontWeight:'bold',

    },
    dateTimeConatiner:{
        marginBottom:16,
        zIndex:-10,        
        backgroundColor:ColorPallete.screenBg,
        // flex:1,
        // padding:16,
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