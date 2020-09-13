import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';



const reactotron = Reactotron.configure({ name: 'DashboardDrTawsel', host: '127.0.0.1', port: 9090 })
    .use(reactotronRedux()).useReactNative()
    .connect();

export default reactotron



