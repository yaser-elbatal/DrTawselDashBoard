import React from 'react'
import AllOrders from '../../../common/AllOrders'
import i18n from '../../../locale/i18n'

function Rejectedrequests({ navigation }) {
    return (
        <AllOrders
            navigation={navigation}
            label={i18n.t('Rejectedrequests')}
        />
    )
}

export default Rejectedrequests