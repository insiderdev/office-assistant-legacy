import { NativeModules } from 'react-native';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

NativeModules.StatusBarManager = {getHeight: jest.fn()};