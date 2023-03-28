/**
 * DataType class represents a custom data type with a set of regex patterns.
 */
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
	 * Gets the name of the DataType instance.
	 * @returns {string} - The name of the DataType.
	 */
	getName() {
		return this.name;
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
	 * Gets all regex patterns in the DataType instance.
	 * @returns {Object} - The regex patterns.
	 */
	getRegexes() {
		return this.regexes;
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

/**
 * Validator class is responsible for validating values based on a DataType instance.
 */
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
	 * Gets the DataType instance for the Validator.
	 * @returns {DataType} - The DataType instance.
	 */
	getDatatype() {
		return this.datatype;
	}

	setSearchType(type) {

		if (type === "one" || type === "all") {
			this.searchtype = type;
		} else {
			throw new Error(`Invalid search type ${type} | Valid types are "one" and "all"`);
		}

		return this;

	}

	getSearchType() {
		return this.searchtype;
	}

	/**
	 * Validates a value based on the DataType instance's regex patterns.
	 * @param {string} value - The value to validate.
	 * @returns {boolean} - Returns true if the value matches any of the regex patterns, false otherwise.
	 */
	validate(value) {
		const regexes = this.datatype.getRegexes();

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
		}
		return false;
	}
}

module.exports = {
	Validator,
	DataType,
};
