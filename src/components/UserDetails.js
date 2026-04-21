import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const UserDetails = (props) => (
    <View>
        <View style={styles.cardWrapper}>
            <Image source={props.image} style={styles.img}/>
            <View style={styles.infoWrapper}>
                <Text style={styles.name}>{props.name}</Text>
                <Text>{props.desc}</Text>
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    cardWrapper: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 8,
        width: '90%',
        alignSelf: 'center',
        marginBottom: 15, 
    },
    img: {
        width: 100,
        height: 100,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    infoWrapper: {
        marginLeft: 20,
        marginTop: 20,
    },
    name: {
        fontWeight: 'bold',
    },
});


export default UserDetails;
