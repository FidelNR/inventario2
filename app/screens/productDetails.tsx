import React, { useEffect, useState } from "react";
import { Button, FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Product } from "./model/Product";
import { RouteProp } from "@react-navigation/native";
import {RootStackParamList} from '../../App';
import { StackNavigationProp } from "@react-navigation/stack";
import LocalDB from "../persistance/localdb";

type LoginProps = {
    navigation:StackNavigationProp<RootStackParamList, 'Home'>;
}

export type Params = {
    product:Product;
}

export type Props= {
    route: RouteProp<RootStackParamList, 'ProductDetails'>;
    navigation:StackNavigationProp<RootStackParamList, 'ProductDetails'>;
};

type StockMovement = {
    id: number;
    id_producto: number;
    nombre: string;
    cantidad: number;
    fecha: string;
};

function ProductDetails({route,navigation}: Props): React.JSX.Element {
    const [product,setProduct] = useState<Product>();
    const [maxStockMovements, setMaxStockMovements] = useState<StockMovement[]>([]);
    const [minStockMovements, setMinStockMovements] = useState<StockMovement[]>([]);

    useEffect(() => {
        setProduct(route.params.product);

        const fetchStockMovements = async () => {
            navigation.addListener('focus',async ()=>{
            const db = await LocalDB.connect();
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM maxstock WHERE idproducto = ?',
                    [product.id],
                    (_, res) => setMaxStockMovements(res.rows.raw()),
                    error => console.error({ error })
                );
                tx.executeSql(
                    'SELECT * FROM minstock WHERE id_producto = ?',
                    [product.id],
                    (_, res) => setMinStockMovements(res.rows.raw()),
                    error => console.error({ error })
                );
            });
        });
        };


        fetchStockMovements();

    }, [route]);

    const btnMaxStock = function(){
    if (product) {
        navigation.navigate('AumStock', {
            productId: product.id,
            productName: product.nombre,
            currentStock: product.currentStock
        });
    }
    };
    
    const btnMinStock = function(){
        if (product) {
            navigation.navigate('DisStock', {
                productId: product.id,
                productName: product.nombre,
                currentStock: product.currentStock
            });
        }
};

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
                    <Button title="AumentarStock" onPress={btnMaxStock}/>
                    <Button title="DisminuirStock" onPress={btnMinStock}/>
                </View>

            )}

                    <Text style={styles.title}>Movimientos de Aumento de Stock</Text>
                    <FlatList
                        data={maxStockMovements}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.movementItem}>
                                <Text>{item.nombre} - Cantidad: {item.cantidad} - Fecha: {item.fecha}</Text>
                            </View>
                        )}
                    />

                    <Text style={styles.title}>Movimientos de Disminución de Stock</Text>
                    <FlatList
                        data={minStockMovements}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.movementItem}>
                                <Text>{item.nombre} - Cantidad: {item.cantidad} - Fecha: {item.fecha}</Text>
                            </View>
                        )}
                    />
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

    movementItem: {
        padding: 12,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        backgroundColor: 'white',
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