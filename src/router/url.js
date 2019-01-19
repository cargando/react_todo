

export const URL_HOME = '/'; // рут
export const URL_ADD_ITEM = '/add'; // логин
export const URL_VIEW_LIST = '/list'; // регистрация
export const URL_VIEW_ITEM = `${ URL_VIEW_LIST }/view/:code`; // просмотр
export const URL_EDIT_ITEM = `${ URL_VIEW_LIST }/edit/:code`; // редактирование
export const URL_ARCHIVE = `${ URL_VIEW_LIST }/archive`; // архив
