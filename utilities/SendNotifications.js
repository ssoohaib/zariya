import * as Notifications from 'expo-notifications';

export default sendNotification = async (title, body, data)=>{
    console.log('first')
    await Notifications.scheduleNotificationAsync({
      content:{
        title:title,
        body:body,
        data:data
      },
      trigger:{
        seconds:1,
        
      },
    })
}