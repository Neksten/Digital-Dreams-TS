import {IProduct} from "./types/product";

export const products: IProduct[] = [
	{
		id: 1,
		imgUrl: "../img/products/1.png",
		title: "Беспроводная компьютерная гарнитура Logitech G G435, черный/неоновый желтый",
		retailPrice: 8500,
		discountPrice: 6800,
		brand: "Logitech",
		color: 'чёрный'
	},
	{
		id: 2,
		imgUrl: "../img/products/2.png",
		title: "Компьютерный корпус Deepcool CK500 WH белый",
		discountPrice: 7200,
		brand: "Deepcool",
		color: 'белый'
	},
	{
		id: 3,
		imgUrl: "../img/products/3.png",
		title: "Наушники Beyerdynamic DT 990 PRO, черный",
		retailPrice: 27430,
		discountPrice: 15750,
		brand: "Beyerdynamic",
		color: 'чёрный'
	},
	{
		id: 4,
		imgUrl: "../img/products/4.png",
		title: "Фен Xiaomi Mi Ionic Hair Dryer H300 EU CMJ02ZHM (BHR5081GL)",
		retailPrice: 2890,
		discountPrice: 2580,
		brand: "Xiaomi",
		color: 'белый'
	},
	{
		id: 5,
		imgUrl: "../img/products/5.png",
		title: "Беспроводная компактная мышь Xiaomi Wireless Mouse Lite, черный",
		retailPrice: 920,
		discountPrice: 625,
		brand: "Xiaomi",
		color: 'чёрный'
	},
	{
		id: 6,
		imgUrl: "../img/products/6.png",
		title: "Умная колонка Яндекс Станция Мини без часов с Алисой, серый опал, 10Вт",
		retailPrice: 6990,
		discountPrice: 5990,
		brand: "Яндекс",
		color: 'белый'
	}
]

export const sortedList: string[] = [
	'По названию',
	'По возрастанию цены',
	'По убыванию цены',
]
export const filtersList: any[] = [
	{
		title: 'Цвет',
		options: [
			'Чёрный',
			'Белый'
		]
	},
	{
		title: 'Бренд',
		options: [
			'Xiaomi',
			'Deepcool',
			'Яндекс',
			'Beyerdynamic',
			'Logitech'
		]
	}
]