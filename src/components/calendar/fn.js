
/* возвращает объект с 2 полями: на какой день недели выпадает первое число месяца и сколько всего в месяце дней*/
function getFirstDayOfMonth(yy, mm) {
	let firstDayOfCurrentMonth = new Date(yy, mm, 1); // дата на момент первого числа текущего месяца
	let month = firstDayOfCurrentMonth.getMonth(); // месяц от 0 до 11, нужно прибавлять 1
	// let dayMonth = firstDayOfCurrentMonth.getDate();
	let dayWeek = firstDayOfCurrentMonth.getDay(); // от 0 до 6, причем 0 - это воскресение
	dayWeek = (dayWeek === 0) ? 7 : dayWeek;

	// let lastDayOfMonth = new Date(yy, mm +1, 0).getDate();
	return {
		dayWeek, // номер дня недели первого числа текущего месяца
		maxDays: getLastDay(yy, mm), // максимальное количество дней  в текуще месяце (который был передан в качестве параметре )
	}
}

function getLastDay(yy, mm) {
	return  new Date(yy, mm +1, 0).getDate();
}