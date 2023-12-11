import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ColorPallete from '../constants/ColorPallete';
import ReceiveDonationBtn from './ReceiveDonationBtn';

function Feedback() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [rating, setRating] = useState(0);

    const handleOptionPress = (option) => {
        setSelectedOption(option);
    };

    const handleStarPress = (index) => {
        setRating(index + 1);
    };

    const renderOption = (option) => {
        const isSelected = selectedOption === option;

        return (
            <TouchableWithoutFeedback key={option} onPress={() => handleOptionPress(option)}>
                <View style={[styles.options, isSelected && styles.selectedOption]}>
                    <Text style={[styles.optionsText, isSelected && styles.selectedOptionText]}>{option}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    };

    const renderStar = (index) => {
        return (
            <TouchableWithoutFeedback key={index} onPress={() => handleStarPress(index)}>
                <Ionicons
                    name={index < rating ? 'star' : 'star-outline'}
                    size={24}
                    color={index < rating ? ColorPallete.lightBlue : 'white'}
                />
            </TouchableWithoutFeedback>
        );
    };


    return (
        <View style={styles.container}>
            <Text style={styles.heading}>How would you describe your experience?</Text>
            <View style={styles.rateContainer}>
                {[0, 1, 2, 3, 4].map((index) => renderStar(index))}
            </View>
            <Text style={styles.feedback}>Leave a Feedback</Text>
            <View style={styles.feedbackContainer}>
                {renderOption('Very Professional')}
                {renderOption('On Time')}
            </View>
            <View style={styles.feedbackContainer}>
                {renderOption('Co-operative')}
                {renderOption('Other')}
            </View>
            <TextInput
                placeholder='Write a message here..'
                placeholderTextColor='white'
                style={styles.input} />
            <View style={styles.btnContainer}>
                <ReceiveDonationBtn>Submit</ReceiveDonationBtn>
            </View>
        </View>
    )
}

export default Feedback;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorPallete.darkBlue,
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
        marginTop: 70,
        marginLeft: 16,
        textAlign: 'center',
    },
    rateContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 0,
        justifyContent: 'space-evenly',
    },
    feedback: {
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginTop: 30,
    },
    feedbackContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    options: {
        borderRadius: 8,
        borderWidth: 2,
        height: 60,
        width: 160,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    selectedOption: {
        borderColor: ColorPallete.lightBlue,
    },
    optionsText: {
        color: 'white',
    },
    selectedOptionText: {
        color: ColorPallete.lightBlue,
    },
    input: {
        //height: 200,
        marginHorizontal: 16,
        marginTop: 30,
        paddingHorizontal: 10,
    },
    btnContainer: {
        width: 300,
        marginLeft: 40,
        marginTop: 200,
    }
});