$(document).ready(function() {
    $('#example').DataTable();
} );


	let tableFieldsConfig = {
		fields: [
			{
				header: 'N',
				value: function (obj, index) {
					return this.startingNumber + index;
				},
				style: 'text-align: center;',
			},
			{
				header: 'Date',
				value: function (obj) {
					let date = new Date(obj.date);
					return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
				},
				style: 'padding: 0 10px; width:1%;white-space:nowrap;',
			},
			{
				header: 'Car plate',
				value: function (obj) {
					return obj.plate;
				},
				style: 'padding: 0 10px; width:1%;white-space:nowrap;',
			},
			{
				header: 'Description',
				value: function (obj) {
					return obj.text;
				},
				style: 'padding-left: 5px;',
			},
			{
				header: 'Client',
				value: function (obj) {
					return obj.clientName;
				},
				style: 'padding-left: 5px;',
			},
			{
				header: 'Amount',
				value: function (obj) {
					return obj.amount.toFixed(2);
				},
				style: 'text-align: right;padding-right: 10px;',
			},

			{
				header: 'Edit/Delete',
				value: function (obj) {

					let editAction = `<form action="/edit" method="post">
                                <input hidden name="fetch" value="true" />
                                <button class="controls" title="Edit" name="_id" value="${obj._id}"><img width="25px" height="25px" src="/img/edit_icon.png" /></button>
                            </form>`;

					let deleteAction = `<form disabled>
                                <button type="button" class="controls" title="Delete" name="_id" value="${obj._id}" onclick="deleteRecord(this)"><img width="25px" height="25px" src="/img/delete_icon.png" /></button>
                            </form>`;

					return editAction + deleteAction;
				}
			},
		]
	}

	var clearTable = function (rowsAtStart) {
		rowsAtStart = rowsAtStart || 0;

		var table = document.getElementById("table");
		//or use :  var table = document.all.tableid;
		for (var i = table.rows.length - 1; i >= rowsAtStart; i--)
		{
			table.deleteRow(i);
		}
	}

	var fillTable = function (data, config) {
		var table = document.getElementById("table");
		var fields = config.fields;

		for (let i = 0; i < data.length; i++)
		{
			let row = data[i];

			if (table.rows.length == 0)
			{
				// Add header
				let rowElem = document.createElement('tr');

				for (let j = 0; j < fields.length; j++)
				{
					let cellElem = document.createElement('th');
					cellElem.innerHTML = fields[j].header;
					rowElem.appendChild(cellElem);
				}

				table.appendChild(rowElem);
			}

			let rowElem = document.createElement('tr');

			for (let j = 0; j < fields.length; j++)
			{
				let cellElem = document.createElement('td');
				let fieldConfig = fields[j];
				cellElem.innerHTML = fieldConfig.value.call(config, row, i);
				cellElem.style = fieldConfig.style || '';
				rowElem.appendChild(cellElem);
			}

			table.appendChild(rowElem);
		}
	}

	var goStart = function () {
		fetch(0);
	}

	var goPrev = function () {
		fetch(tableFieldsConfig.startingNumber - tableFieldsConfig.limit - 1);
	}

	var goNext = function () {
		fetch(tableFieldsConfig.startingNumber + tableFieldsConfig.limit - 1);
	}

	var goLast = function () {
		let index = tableFieldsConfig.count - tableFieldsConfig.count % tableFieldsConfig.limit;

		if (index == tableFieldsConfig.count)
		{
			index -= tableFieldsConfig.limit;
		}

		index = Math.max(0, index);

		fetch(index);
	}

	var fetch = function (skip) {
		return Promise.resolve()
		.then(function () {

			let sort = JSON.parse(document.querySelector('#sortSelect').value);
			let filterValue = document.querySelector('#filter').value.trim();
			let query = {};

			if (filterValue)
			{
				let queryField = document.querySelector('#filterSelect').value;
				query[queryField] = filterValue;
			}

			return XHR('/view', {
				query: query,
				options: {
					sort: sort,
					skip: skip || 0,
				}
			}, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'Content-type': 'application/json',
				},
				isJsonResponse: true,
			})
		})
		.then(function (response) {

			// console.log(response);
			clearTable(0);
			response = response || {};

			if (response.status)
            {
            	throw new Error(response.message);
            }

			let data = response.data || [];
			let options = response.options || {};

			tableFieldsConfig.startingNumber = options.skip + 1;
			tableFieldsConfig.count = response.count;
			tableFieldsConfig.limit = options.limit;

			fillTable(data, tableFieldsConfig);

			let buttonStart = document.querySelector('#goStart');
			let buttonPrev = document.querySelector('#goPrev');
			let buttonNext = document.querySelector('#goNext');
			let buttonLast = document.querySelector('#goLast');

			buttonStart.disabled = tableFieldsConfig.startingNumber == 1;
			buttonPrev.disabled = (tableFieldsConfig.startingNumber < tableFieldsConfig.limit);
			buttonNext.disabled = (tableFieldsConfig.startingNumber - 1 + data.length >= tableFieldsConfig.count);
			buttonLast.disabled = (tableFieldsConfig.startingNumber - 1 + data.length >= tableFieldsConfig.count);

			var statusElem = document.querySelector('.status');
			statusElem.hidden = true;

		})
		.catch(function (err) {

			var statusElem = document.querySelector('.status');
			statusElem.innerText = err.message;
			statusElem.hidden = false;

		})
	}

	fetch();

	var deleteRecord = function (el) {

		var _id = el.value;

		var answer = confirm('Delete a record?');

		if (!answer)
		{
			return;
		}

		Promise.resolve()
		.then(function () {

			return XHR('/delete', {
				_id: _id,
			}, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'Content-type': 'application/json',
				},
				isJsonResponse: true,
			})
		})
		.then(function (response) {

			return fetch();

		})

	}

	var clearFilter = function () {
		let filterInput = document.querySelector('#filter');
		filterInput.value = '';

		goStart();
	}
