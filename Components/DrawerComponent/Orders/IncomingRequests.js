import React from 'react'
import AllOrders from '../../../common/AllOrders'
import i18n from '../../../locale/i18n'


function IncomingRequests({ navigation }) {

    return (
        <AllOrders
            navigation={navigation}
            label={i18n.t('IncomingRequests')}
            onPress={() => navigation.navigate('OrderDetailes')}

        />
    )
}

export default IncomingRequests
