const filterDataByType = (data, type) => {
	if (type === "income" || type === "expense") {
		return data.filter(item => item.type === type);
	}
	return data;
};

const sortDataByDate = data => {
	return [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
};

const splitTransactions = data => {
	const lastTransactions = data.slice(0, 4).reverse();
	const previousTransactions = data.slice(4);
	return [lastTransactions, previousTransactions];
};

const calculatePreviousBalance = (transactions, type) => {
	return transactions.reduce((acc, item) => {
		if (type === "income") {
			return item.type === "income" ? acc + item.amount : acc;
		} else if (type === "expense") {
			return item.type === "expense" ? acc + item.amount : acc;
		} else if (type === "balance") {
			return item.type === "income" ? acc + item.amount : acc - item.amount;
		}
		return acc;
	}, 0);
};

const processLastTransactions = (transactions, type, initialBalance) => {
	let balance = initialBalance;

	return transactions.map(item => {
		if (type === "balance") {
			balance += item.type === "income" ? item.amount : -item.amount;
		} else if (type === "income" && item.type === "income") {
			balance += item.amount;
		} else if (type === "expense" && item.type === "expense") {
			balance += item.amount;
		}

		return formatTransactionData(item, type, balance);
	});
};

const formatTransactionData = (item, type, balance) => {
	if (type === "income") {
		return { date: item.date, income: balance };
	} else if (type === "expense") {
		return { date: item.date, expense: balance };
	}
	return { date: item.date, balance };
};

const formatChartData = (formattedData, previousBalance, type) => {
	if (type === "income") {
		return [{ income: previousBalance }, ...formattedData];
	} else if (type === "expense") {
		return [{ expense: previousBalance }, ...formattedData];
	}
	return [{ balance: previousBalance }, ...formattedData];
};

export const processChartData = (data, type) => {
	if (!data || !data.length) return [];

	const filteredData = filterDataByType(data, type);

	const sortedData = sortDataByDate(filteredData);

	const [lastTransactions, previousTransactions] = splitTransactions(sortedData);

	const previousBalance = calculatePreviousBalance(previousTransactions, type);

	const formattedData = processLastTransactions(lastTransactions, type, previousBalance);

	return formatChartData(formattedData, previousBalance, type);
};
