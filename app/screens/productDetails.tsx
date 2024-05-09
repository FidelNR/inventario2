import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Product } from "./model/Product";
import { RouteProp } from "@react-navigation/native";
import {RootStackParamList} from '../../App';
import { StackNavigationProp } from "@react-navigation/stack";

export type Params = {
    product:Product;
}

export type Props= {
    route: RouteProp<RootStackParamList, 'ProductDetails'>;
    navigation:StackNavigationProp<RootStackParamList, 'ProductDetails'>;
};

function ProductDetails({route}: Props): React.JSX.Element {
    const [product,setProduct] = useState<Product>();

    useEffect(() => {
        setProduct(route.params.product);
    }, [route]);

    return(
        <SafeAreaView>
            {product && (
                <View style={styles.main}>
                    <Text style={styles.title}>Producto</Text>
                    <Text style={styles.itemMain}>{product.nombre}</Text>
                    <Text style={styles.itemBadge}>Cantidad</Text>
                    <Text style={styles.itemBadge}>{product.currentStock} / {product.maxStock}</Text>
                    <Text style={styles.itemBadge}>Precio</Text>
                    <Text style={styles.itemBadge}>{product.precio}</Text>
                </View>
            )}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
   main:
   {
    display:'flex',
   },

    title:
    {
        alignSelf:'center',
        color:'black',
        fontSize:36,
        fontWeight:'bold',
        marginBottom:24,
    },
    
    itemMain: {
        fontSize: 28,
        color:'black',

    },

    itemBadge: {
        fontSize: 22,
        color:'green',
        alignSelf:"center"

    },

    

    productItem: {
        padding: 12,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        backgroundColor: 'white',
    },
    itemTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',

    },
    itemDetails: {
        fontSize: 14,
        opacity: 0.7,
    }

})

export default ProductDetails;