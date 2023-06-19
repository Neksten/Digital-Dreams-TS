import * as ProductActionCreator from './product';
import * as CartActionCreator from './cart';
import * as FavoriteActionCreator from './favorite';

export default {
	...ProductActionCreator,
	...CartActionCreator,
	...FavoriteActionCreator,
};