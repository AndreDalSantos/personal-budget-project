import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity, View, TextInput } from 'react-native'

import api from '../src/services/api'

export default function App(){

    const [budgetItems, setBudgetItems] = useState([])
    const [category, setCategory] = useState('')
    const [value, setValue] = useState('')

    const [totalBudget, setTotalBudget] = useState(0)

    useEffect(() => {
        api.get('budgetItems').then(response => {
            setBudgetItems(response.data)
        });

        api.get('totalBudget').then(response => {
            setTotalBudget(response.data)
        })

    }, []);

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="blue" />

            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={styles.header}>
                        💰️ ORÇAMENTO PESSOAL
                    </Text>
                </View>
                <FlatList                    
                    data={budgetItems}
                    keyExtractor={budgetItem => budgetItem.id}
                    renderItem={({ item: budgetItem }) => (
                        <View style={styles.block}>
                            <Text style={styles.text}>💲️{budgetItem.category}: </Text>
                            <Text style={styles.text}> R$ {budgetItem.value}</Text>              
                        </View>
                        )}
                />

                <View style={styles.total}>
                    <Text style={styles.textTotal}> 💵️ Total: </Text>
                    <Text style={styles.textTotal}>R$ {totalBudget}</Text>
                </View>                

            </SafeAreaView>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(15, 15, 15)',
    },

    header: {
        marginTop: 25,
        marginLeft: 20,
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center'
    },

    block: {
        marginLeft: 20,
        marginBottom:5,
        flexDirection: 'row',
        borderBottomColor: 'white',
    },

    text: {
        color: "#fff",
        fontSize: 20,
        textTransform: 'capitalize',
    },

    textTotal: {
        color: "#fff",
        fontSize: 25,
        textTransform: 'capitalize',
    },

    total: {
        margin: 20,
        flexDirection: 'row'
    },
})