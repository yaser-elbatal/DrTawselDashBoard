import React from 'react'
import AllOrders from '../../../common/AllOrders'
import i18n from '../../../locale/i18n'

function ActiveRequests({ navigation }) {
    return (
        <AllOrders
            navigation={navigation}
            label={i18n.t('ActiveRequests')}
            onPress={() => navigation.navigate('ActiveOrderDetailes')}
        />
    )
}

export default ActiveRequests
