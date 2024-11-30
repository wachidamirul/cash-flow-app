// Filter data berdasarkan tipe (income, expense, atau balance)
const filterDataByType = (data, type) => {
	if (type === "income") {
		return data.filter(item => item.type === "income");
	} else if (type === "expense") {
		return data.filter(item => item.type === "expense");
	}
	return data; // Jika tipe balance, tidak perlu filter
};

// Urutkan data berdasarkan tanggal secara descending
const sortDataByDate = data => {
	return [...data].sort((a, b) => b.date - a.date);
};

// Pisahkan data menjadi transaksi terakhir (4 transaksi) dan transaksi sebelumnya
const splitTransactions = data => {
	const lastTransactions = data.slice(0, 4).reverse(); // Ambil 4 transaksi terakhir, dibalik agar urut
	const previousTransactions = data.slice(4); // Sisanya adalah transaksi sebelumnya
	return [lastTransactions, previousTransactions];
};

// Hitung saldo sebelumnya berdasarkan transaksi sebelumnya
const calculatePreviousBalance = (transactions, type) => {
	return transactions.reduce((acc, item) => {
		if (type === "balance") {
			// Untuk tipe balance, hitung saldo kumulatif
			return item.type === "income" ? acc + item.amount : acc - item.amount;
		}
		return acc + item.amount; // Untuk income/expense, jumlahkan langsung
	}, 0);
};

// Proses transaksi terakhir untuk menghitung saldo atau jumlah yang diperlukan
const processLastTransactions = (transactions, type, initialBalance) => {
	let balance = initialBalance;

	return transactions.map(item => {
		if (type === "balance") {
			// Jika tipe balance, hitung saldo kumulatif
			balance += item.type === "income" ? item.amount : -item.amount;
		} else {
			// Untuk income dan expense, langsung jumlahkan jumlah transaksi
			balance += item.amount;
		}

		// Return data sesuai dengan tipe
		return formatTransactionData(item, type, balance);
	});
};

// Format transaksi berdasarkan tipe (income, expense, balance)
const formatTransactionData = (item, type, balance) => {
	if (type === "income") {
		return { income: item.amount };
	} else if (type === "expense") {
		return { expense: item.amount };
	}
	return { balance }; // Untuk balance, return saldo kumulatif
};

// Format data akhir untuk chart dengan saldo awal
const formatChartData = (formattedData, previousBalance, type) => {
	if (type === "income") {
		return [{ income: previousBalance }, ...formattedData];
	} else if (type === "expense") {
		return [{ expense: previousBalance }, ...formattedData];
	}
	return [{ balance: previousBalance }, ...formattedData];
};

export const processChartData = (data, type) => {
	// Pastikan data ada dan tidak kosong
	if (!data || !data.length) return [];

	// Filter data sesuai dengan tipe yang dipilih (income, expense, atau balance)
	const filteredData = filterDataByType(data, type);

	// Urutkan data berdasarkan tanggal transaksi terbaru
	const sortedData = sortDataByDate(filteredData);

	// Pisahkan data menjadi transaksi terakhir dan transaksi sebelumnya
	const [lastTransactions, previousTransactions] = splitTransactions(sortedData);

	// Hitung saldo sebelumnya dari transaksi sebelumnya
	const previousBalance = calculatePreviousBalance(previousTransactions, type);

	// Proses transaksi terakhir untuk menghitung saldo atau jumlah yang diperlukan
	const formattedData = processLastTransactions(lastTransactions, type, previousBalance);

	// Return data yang telah diformat sesuai tipe yang dipilih
	return formatChartData(formattedData, previousBalance, type);
};
