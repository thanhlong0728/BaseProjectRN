import { StripeProvider, CardField } from '@stripe/stripe-react-native'
import React, { useEffect, useState, } from 'react'
import { TouchableOpacity, StyleSheet, Text, Pressable, View, KeyboardAvoidingView, Platform } from 'react-native'
import Modal from 'react-native-modal'
import { Colors } from '@/theme'
import { Box, AppText } from '@/components'
import { CheckBoxIcon } from '@rneui/base/dist/CheckBox/components/CheckBoxIcon'
import { IPaymentStripe } from '@/interface/payment'
import { ScrollView } from 'react-native-gesture-handler'
import { IPointPackage } from '@/interface/pointPackage'
import { PaymentStripeTypeEnums } from '@/enum/payment.enum'
import { s, scale } from 'react-native-size-matters'

type Props = {
    onClose?: any
    isShowAddCardPopup?: boolean
    handleOnClick?: any
    isVisisble?: boolean
    onConfirmPaymentPress: (pointPackage: IPointPackage, stripePaymentType: number, existingPayment?: IPaymentStripe) => void
    publishableKey: string
    existingPayments: IPaymentStripe[]
    pointPackage: IPointPackage
}

type PaymentExistingProps = {
    cardNumber: string
    cardExpired: string
    onSeclectPress?: () => void
    isSelected: boolean
}

const PaymentStripeExisting = (props: PaymentExistingProps) => {
    return (
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10 }} onPress={props.onSeclectPress}>
            <Box style={{ marginLeft: scale(12) }} row>
                <CheckBoxIcon checked={props.isSelected} size={22} checkedColor={Colors.primary} />
                <AppText style={{ paddingHorizontal: 8 }} >{props.cardNumber} - {props.cardExpired}</AppText>
            </Box>
        </TouchableOpacity>
    )

}



const PaymentStripeModal = ({ onClose, isVisisble, onConfirmPaymentPress, publishableKey, existingPayments, pointPackage }: Props) => {

    const [selectedPaymentStripeType, setSelectedPaymentStripeType] = useState(PaymentStripeTypeEnums.NEW)
    const [selectedExisttingCard, setSelectedExisttingCard] = useState<IPaymentStripe>()
    const [cardFieldKey, setCardFieldKey] = useState<string>()
    const onPaymentStripeTypePress = (type: number, card?: IPaymentStripe) => {
        setSelectedPaymentStripeType(type)
        setSelectedExisttingCard(card)
        clearCardField()

    }
    const clearCardField = () => {
        if(Platform.OS === 'ios'){
            setCardFieldKey(Math.random().toString());
        }
    };

    useEffect(() => {
        if (existingPayments && existingPayments.length > 0) {
            onPaymentStripeTypePress(PaymentStripeTypeEnums.EXISTING, existingPayments[0])
        }
    }, [existingPayments])

    return (
        <StripeProvider publishableKey={publishableKey}>
            <Modal isVisible={isVisisble} onBackdropPress={onClose} animationIn="zoomIn" animationOut="zoomOut">
                <Box style={styles.rootBox}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        keyboardVerticalOffset={Platform.OS === "ios" ? s(70) : s(20)}

                    >

                        <ScrollView>
                            <Box style={{ flex: 1, paddingHorizontal: 6 }} key={'PaymentCard'}>
                                {
                                    existingPayments && existingPayments.length > 0 && (
                                        <>
                                            <Box style={{ flexDirection: 'row', marginBottom: 4, marginTop: 8 }} >
                                                <AppText style={{ fontSize: 16, fontWeight: '600' }}>前回カード</AppText>
                                            </Box>
                                            {existingPayments?.map((item: IPaymentStripe, index: number) => {
                                                return (
                                                    <PaymentStripeExisting
                                                        key={index?.toString()}
                                                        cardNumber={item.cardNumber}
                                                        cardExpired={item.cardExpired}
                                                        isSelected={selectedPaymentStripeType == PaymentStripeTypeEnums.EXISTING && item.id == selectedExisttingCard?.id}
                                                        onSeclectPress={() => onPaymentStripeTypePress(PaymentStripeTypeEnums.EXISTING, item)}
                                                    />
                                                )
                                            }
                                            )}
                                        </>
                                    )
                                }

                                <Box>
                                    <Box >
                                        <Box style={{ flexDirection: 'row', marginBottom: 4, marginTop: 8 }} >
                                            <AppText fontSize={16} style={{ fontWeight: '600' }}>新しいカード </AppText>
                                        </Box>
                                        <CardField
                                            postalCodeEnabled={false}
                                            style={{
                                                minHeight: 45,
                                                marginBottom: 15,
                                                flex: 1
                                            }}
                                            cardStyle={{ fontSize: 15 }}
                                            placeholders={{
                                                number: '4242 4242 4242 4242',
                                            }}
                                            onFocus={(focusedField) => {
                                                setSelectedExisttingCard(undefined)
                                                setSelectedPaymentStripeType(PaymentStripeTypeEnums.NEW)
                                            }}

                                            key={cardFieldKey}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                            <Box style={{ marginHorizontal: 10, flex: 1 }} key={'PaymentButton'}>
                                {
                                    selectedPaymentStripeType == PaymentStripeTypeEnums.NEW && (
                                        <TouchableOpacity
                                            key={PaymentStripeTypeEnums.NEW}
                                            style={styles.btnBuy}
                                            onPress={() => onConfirmPaymentPress(pointPackage, PaymentStripeTypeEnums.NEW)}
                                        >
                                            <AppText style={{ color: 'white' }}>購入</AppText>
                                        </TouchableOpacity>
                                    )
                                }
                                {
                                    selectedPaymentStripeType == PaymentStripeTypeEnums.EXISTING && (
                                        <TouchableOpacity
                                            key={PaymentStripeTypeEnums.EXISTING}
                                            style={styles.btnBuy}
                                            onPress={() => onConfirmPaymentPress(pointPackage, PaymentStripeTypeEnums.EXISTING, selectedExisttingCard)}
                                        >
                                            <AppText style={{ color: 'white' }}>購入 </AppText>
                                        </TouchableOpacity>
                                    )
                                }
                            </Box>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </Box>
            </Modal>
        </StripeProvider>
    )
}

export default PaymentStripeModal

const styles = StyleSheet.create({
    rootBox: {
        backgroundColor: 'white',
        paddingTop: 30,
        paddingHorizontal: 10,
        borderRadius: 16,
        // minHeight: 300
    },
    cancelButton: {
        marginBottom: 23,
        marginTop: 12,
    },
    textInput: {
        marginHorizontal: 10,
        padding: 10,
        height: 40,
        borderWidth: 1,
        borderColor: '#CACACA',
        borderRadius: 5,
    },
    btnBuy: {
        backgroundColor: Colors.primary,
        height: 48,
        marginTop: 20,
        marginBottom: 30,
        marginHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
