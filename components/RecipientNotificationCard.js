import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ColorPallete from '../constants/ColorPallete';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


function RecipientNotificationCard(props) {
    const [isOptionsVisible, setOptionsVisible] = useState(false);
    const isRead = props.status === 'read';
  
    const showOptions = () => {
      setOptionsVisible(true);
    };
  
    const hideOptions = () => {
      setOptionsVisible(false);
    };
  
    const handleMoreOptionsPress = () => {
      showOptions();
    };
  
    const handleOptionPress = (option) => {
      if (option === 'delete') {
        props.onDelete();
      } else if (option === 'markAsRead') {
        //setIsRead(true);
        props.onMarkAsRead(props.id);
        hideOptions();
      } else if (option === 'markAsUnread') {
        //setIsRead(false);
        props.onMarkAsUnread(props.id);
        hideOptions();
      }
    };

  return (
    <View style={[styles.container, isRead ? { backgroundColor: '#FFF3E8' } : null, props.from=="donor" && {borderRadius:8}]}>
      <TouchableOpacity onPress={() => handleMoreOptionsPress()} style={styles.iconContainer}>
        <Ionicons name="options" size={24} color={ColorPallete.primary} />
      </TouchableOpacity>
      {!props.from=='donor'&&<View style={styles.innerContainer}></View>}
      <View style={styles.innerContainer}>
        <View style={[styles.imageContainer, props.from == 'donor' && {height:'auto', width:'auto', borderRadius:8, overflow:"hidden"}]}>
        {
          props.from === 'donor' ?
          <MaterialCommunityIcons style={{backgroundColor:ColorPallete.mediumBlue, padding:8}} name={props.icon} size={20} color={'white'} />
          :
          <Ionicons>{props.icon}</Ionicons>
        }
        </View>
        <View style={styles.nameTimeDescContainer}>
          <View style={styles.nameTimeContainer}>
            <Text style={styles.name}>{props.name}</Text>
            <Text style={styles.desc}>{props.desc}</Text>
          </View>
          <Text style={styles.time}>{props.time}</Text>
        </View>
      </View>
      <View style={styles.separator} />
      <Modal transparent={true} visible={isOptionsVisible} onRequestClose={hideOptions}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => handleOptionPress('markAsRead')}>
            <Text style={styles.modalOption}>{isRead ? 'Mark as Unread' : 'Mark as Read'}</Text>
          </TouchableOpacity>
          <View style={styles.modalSeparator} />
          <TouchableOpacity onPress={() => handleOptionPress('delete')}>
            <Text style={styles.modalDelete}>Delete</Text>
          </TouchableOpacity>
          <View style={styles.modalSeparator} />
          <TouchableOpacity onPress={hideOptions}>
            <Text style={styles.modalCancel}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

export default RecipientNotificationCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',

        // borderWidth:1
    },
    innerContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
    },
    nameTimeDescContainer: {
        flexDirection: 'column',
        marginLeft: 10,
    },
    nameTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageContainer: {
        width: 25,
        height: 25,
        borderRadius: 5,
        backgroundColor: '#FFEAD7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    time: {
        marginTop: 5,
        fontWeight: '300',
        color: '#B8B8B8',
        fontSize: 12,
    },
    desc: {
        fontWeight: '400',
        fontSize: 14,
        marginLeft: 3,
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        marginLeft: 10,
        marginRight: 10,
    },
    iconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    modalContainer: {
        position: 'absolute',
        top: 130,
        right: 20,
        backgroundColor: 'white',
        padding: 12,
        flexDirection: 'column',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius:8,
    },
    modalOption: {
        fontSize: 12,
        color: 'blue',
        textAlign: 'center',
        //marginBottom: 5,
    },
    modalDelete: {
        fontSize: 12,
        color: 'red',
        textAlign: 'center',
        marginTop: 5,
        //marginBottom: 5,
    },
    modalCancel: {
        fontSize: 12,
        color: 'red',
        textAlign: 'center',
        marginTop: 5,
        // marginBottom: 5,
    },
    modalSeparator: {
        height: 1,
        backgroundColor: '#E0E0E0',
        width: '100%',
        marginVertical: 5,
    }
});