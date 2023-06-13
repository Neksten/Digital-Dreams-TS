# Elgin Denis

---
Тестовое задание:

Написать SPA приложение (интернет-магазин).
_Необходимый функционал:_
- Развернуть React/Redux приложение
- route / - вывод товаров. Реализовать сортировки по цене и по названию. Реализовать исключающие фильтры по товарам по какому-либо признаку товара;
- Реализовать функционал добавления товаров в корзину;
- route /cart - вывод краткой информации о товарах добавленных в корзину;
- route /order - оформление заказа;
    - 1-ый шаг - информация о покупателе
    - 2-ый шаг - банковская карта
    - 3-ый шаг - информация об адресе. Сделать возможность указать адрес через карту

---

Описание проекта:

- Интернет-магазин цифровой и бытовой техники под названием "Digital Dreams".
- Главная страница ( route / ) - происходит вывод товаров. Из функционала:
    - добавление в корзину;
    - счётчик изменяющий количество товаров в корзине;
    - сортировка товаров:  по названию(по умолчанию), по возрастанию цены, по убыванию цены;
    - исключающие фильтры по 2-м категориям: цвет, бренд.
- Страница корзины ( route /cart ) - чтобы в неё попасть нужно кликнуть на иконку корзины в header. Из функционала:
    - статус пустой корзины
    - счётчик, изменяющий количество товара в корзине;
    - удаление товара из корзины
    - подсчёт итоговой стоимости и скидки
- Страница оформления заказа ( route /order ) - чтобы в неё попасть нужно кликнуть на кнопку "Перейти к оформлению". Из функционала:
    - валидация у полей ввода
    - ввод банковской карты
    - возможность выбора ПВЗ на карте кликом на метку
    - выпадающее меню доступных ПВЗ при клике на input с адресом
    - подсчёт итоговой стоимости и скидки
    - отправка json строки в консоль при успешном оформление заказа

---

Подготовительные действия:

1.  Произвести клонирование репозитория в свою папку `git clone https://github.com/Neksten/Digital-Dreams.git`
2.  Прописать в консоли `npm i`

---

Как запускать проект:

- Для запуска проекта пропишите в конcоли `npm start`