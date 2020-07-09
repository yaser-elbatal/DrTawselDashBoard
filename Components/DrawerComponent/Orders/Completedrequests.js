import React from 'react'
import AllOrders from '../../../common/AllOrders'
import i18n from '../../../locale/i18n'

function Completedrequests({ navigation }) {
    return (
        <AllOrders
            navigation={navigation}
            label={i18n.t('Completedrequests')}
        />
    )
}

export default Completedrequests
