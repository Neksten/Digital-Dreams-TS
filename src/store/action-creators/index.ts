import * as ProductActionCreator from './product';
import * as CartActionCreator from './cart';

export default {
	...ProductActionCreator,
	...CartActionCreator,
};