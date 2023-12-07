import { Ionicons } from '@expo/vector-icons';
import ColorPallete from '../constants/ColorPallete';
import { Text } from 'react-native';
export const Analytics = [
    {
        id:'0001',
        category: 'Food',
        money: <Text style={{ color: 'green' }}>+PKR. 806,050</Text>,
        icon: <Ionicons name='fast-food-outline' size={22} color={ColorPallete.darkBlue}/>,
    },
    {
        id:'0002',
        category: 'Medic',
        money: <Text style={{ color: 'red' }}>-PKR. 57,987</Text>,
        icon: <Ionicons name='medkit-outline' size={22} color={ColorPallete.darkBlue}/>,
    },
    {
        id:'0003',
        category: 'Clothes',
        money:<Text style={{ color: 'green' }}>+PKR. 2000</Text>,
        icon: <Ionicons name='md-shirt-outline' size={22} color={ColorPallete.darkBlue}/>,

    },
    {
        id:'0004',
        category: 'Ration',
        money: <Text style={{ color: 'red' }}>-PKR. 65,090</Text>,
        icon: <Ionicons name='fast-food-outline' size={22} color={ColorPallete.darkBlue}/>,
    },
    
]