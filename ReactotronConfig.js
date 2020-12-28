import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';



const reactotron = Reactotron.configure({ name: 'DashboardDrTawsel', host: '192.168.2.7', port: 9090 })
    .use(reactotronRedux()).useReactNative()
    .connect();







export default reactotron







