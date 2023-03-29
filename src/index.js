class DataType {
	constructor() {
		this.name = null;
		this.regexes = {};
	}

	/**
	 * Sets the name of the DataType instance.
	 * @param {string} name - The name of the DataType.
	 */
	setName(name) {
		this.name = name;
		return this;
	}

	/**
	 * Adds a new regex pattern to the DataType instance.
	 * @param {string} name - The name of the regex pattern.
	 * @param {RegExp} regex - The regex pattern.
	 */
	addRegex(name, regex) {
		this.regexes[name] = regex;
		return this;
	}

	/**
	 * Removes a regex pattern from the DataType instance.
	 * @param {string} regexName - The name of the regex pattern to remove.
	 */
	removeRegex(regexName) {
		delete this.regexes[regexName];
		return this;
	}
}


class Validator {
	constructor() {
		this.datatype = null;
		this.searchtype = "one";
	}

	/**
	 * Sets the DataType instance for the Validator.
	 * @param {DataType} datatype - The DataType instance.
	 * @throws {Error} - Throws an error if the datatype is not an instance of DataType.
	 */
	setDatatype(datatype) {
		if (datatype instanceof DataType) {
			this.datatype = datatype;
		} else {
			throw new Error(`Invalid datatype ${datatype}`);
		}
		return this;
	}

	/**
	 * 
	 * @param {string} type - The search type. Valid types are "one" and "all" (One regex must match, or all regexes must match).
	 * @throws {Error} - Throws an error if the search type is not "one" or "all".
	 */
	setSearchType(type) {

		if (type === "one" || type === "all") {
			this.searchtype = type;
		} else {
			throw new Error(`Invalid search type ${type} | Valid types are "one" and "all"`);
		}

		return this;

	}

	/**
	 * Validates that a value is the correct type.
	 * @param {string} value - The value to validate.
	 * @returns {boolean} - Returns true if the value matches (depending on the searchtype, any/one) of the regex patterns, false otherwise.
	 */
	validate(value) {
		const regexes = this.datatype.regexes;

		if (this.searchtype === "one") {

			for (const regexName in regexes) {
				if (regexes[regexName].test(value)) {
					return true;
				}
			}
		} else if (this.searchtype === "all") {

			for (const regexName in regexes) {
				if (!regexes[regexName].test(value)) {
					return false;
				}
			}
			return true;
		} else {
			throw new Error(`Invalid search type ${this.searchtype} | Valid types are "one" and "all"`);
		}
		return false;
	}
}

module.exports = {
	Validator,
	DataType,
	datatypes: {
		email: new DataType()
			.setName("email")
			.addRegex("email", /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
	}
};
